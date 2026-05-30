/**
 * POST /api/communicate/chat — streaming assistant with optional read-only dataset tools.
 */

import {
  convertToModelMessages,
  gateway,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { z } from "zod";

import { AUDIT_COMPONENT_COMMUNICATE_CHAT } from "@/lib/audit/constants";
import {
  log_ai_input,
  serialize_messages_for_log,
} from "@/lib/audit/log_ai_input";
import { run_logged_chat_tool } from "@/lib/audit/run_logged_chat_tool";
import { extract_token_usage } from "@/lib/audit/token_usage";
import { build_chat_system_prompt } from "@/lib/communicate/build_chat_system_prompt";
import {
  CHAT_GATEWAY_MODEL_ID,
  CHAT_MAX_USER_MESSAGES,
} from "@/lib/communicate/chat_constants";
import { count_user_messages } from "@/lib/communicate/count_user_messages";
import {
  CHAT_UNAVAILABLE_MESSAGE,
  chat_session_limit_message,
} from "@/lib/communicate/chat_user_messages";
import {
  chat_query_spend_by_fiscal_year,
  chat_query_top_agencies,
  chat_query_top_vendors,
} from "@/lib/datasets/vendor_payments_chat_queries";

export const maxDuration = 60;

/**
 * Streams assistant replies; enforces five user messages per session.
 */
export async function POST(req: Request): Promise<Response> {
  if (!process.env.AI_GATEWAY_API_KEY) {
    console.error("Communicate chat: service not configured");
    return Response.json(
      { error: CHAT_UNAVAILABLE_MESSAGE },
      { status: 503 },
    );
  }

  let messages: UIMessage[];

  try {
    const body = (await req.json()) as { messages?: UIMessage[] };
    messages = body.messages ?? [];
  } catch {
    return Response.json({ error: CHAT_UNAVAILABLE_MESSAGE }, { status: 400 });
  }

  const user_turns = count_user_messages(messages);

  if (user_turns > CHAT_MAX_USER_MESSAGES) {
    return Response.json(
      { error: chat_session_limit_message() },
      { status: 429 },
    );
  }

  const system = await build_chat_system_prompt();

  await log_ai_input({
    component: AUDIT_COMPONENT_COMMUNICATE_CHAT,
    event_kind: "model_request",
    model_id: CHAT_GATEWAY_MODEL_ID,
    payload: {
      user_turn_count: user_turns,
      user_messages: serialize_messages_for_log(messages),
      system_prompt: system,
    },
  });

  try {
    const result = streamText({
      model: gateway(CHAT_GATEWAY_MODEL_ID),
      system,
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(5),
      onFinish: async ({ text, totalUsage }) => {
        await log_ai_input({
          component: AUDIT_COMPONENT_COMMUNICATE_CHAT,
          event_kind: "model_response",
          model_id: CHAT_GATEWAY_MODEL_ID,
          tokens: extract_token_usage(totalUsage),
          payload: { text },
        });
      },
      tools: {
        query_top_vendors: tool({
          description:
            "Top vendors by total payment amount. Use when insights/FAQs do not answer. Optional fiscal year.",
          inputSchema: z.object({
            limit: z.number().int().min(1).max(50).optional(),
            fy: z.number().int().optional(),
          }),
          execute: async ({ limit, fy }) =>
            run_logged_chat_tool(
              "query_top_vendors",
              { limit, fy },
              () => chat_query_top_vendors(limit, fy ?? null),
            ),
        }),
        query_spend_by_fiscal_year: tool({
          description:
            "Total spend per fiscal year. Use when insights/FAQs do not answer.",
          inputSchema: z.object({}),
          execute: async () =>
            run_logged_chat_tool("query_spend_by_fiscal_year", {}, () =>
              chat_query_spend_by_fiscal_year(),
            ),
        }),
        query_top_agencies: tool({
          description:
            "Top agencies by total spend. Use when insights/FAQs do not answer. Optional fiscal year.",
          inputSchema: z.object({
            limit: z.number().int().min(1).max(50).optional(),
            fy: z.number().int().optional(),
          }),
          execute: async ({ limit, fy }) =>
            run_logged_chat_tool(
              "query_top_agencies",
              { limit, fy },
              () => chat_query_top_agencies(limit, fy ?? null),
            ),
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch {
    console.error("Communicate chat: stream failed");
    return Response.json(
      { error: CHAT_UNAVAILABLE_MESSAGE },
      { status: 503 },
    );
  }
}
