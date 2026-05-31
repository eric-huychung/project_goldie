/**
 * POST /api/communicate/chat — streaming assistant with curated dataset context.
 */

import {
  convertToModelMessages,
  gateway,
  streamText,
  type UIMessage,
} from "ai";

import { AUDIT_COMPONENT_COMMUNICATE_CHAT } from "@/lib/audit/constants";
import {
  log_ai_input,
  serialize_messages_for_log,
} from "@/lib/audit/log_ai_input";
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
  format_chat_user_error,
} from "@/lib/communicate/chat_user_messages";

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

  void log_ai_input({
    component: AUDIT_COMPONENT_COMMUNICATE_CHAT,
    event_kind: "model_request",
    model_id: CHAT_GATEWAY_MODEL_ID,
    payload: {
      user_turn_count: user_turns,
      user_messages: serialize_messages_for_log(messages),
      system_prompt_chars: system.length,
    },
  });

  try {
    const result = streamText({
      model: gateway(CHAT_GATEWAY_MODEL_ID),
      system,
      messages: await convertToModelMessages(messages),
      onFinish: async ({ text, totalUsage }) => {
        await log_ai_input({
          component: AUDIT_COMPONENT_COMMUNICATE_CHAT,
          event_kind: "model_response",
          model_id: CHAT_GATEWAY_MODEL_ID,
          tokens: extract_token_usage(totalUsage),
          payload: { text },
        });
      },
    });

    return result.toUIMessageStreamResponse({
      onError: (error) =>
        format_chat_user_error(
          error instanceof Error ? error.message : String(error),
        ),
    });
  } catch (error) {
    console.error("Communicate chat: stream failed", error);
    return Response.json(
      {
        error: format_chat_user_error(
          error instanceof Error ? error.message : undefined,
        ),
      },
      { status: 503 },
    );
  }
}
