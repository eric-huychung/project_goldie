/**
 * POST /api/discover/question-assist — LLM suggest or refine for custom questions.
 */

import { generateText, gateway } from "ai";
import { z } from "zod";

import { AUDIT_COMPONENT_DISCOVER_QUESTION_ASSIST } from "@/lib/audit/constants";
import { log_ai_input } from "@/lib/audit/log_ai_input";
import { extract_token_usage } from "@/lib/audit/token_usage";
import { CHAT_GATEWAY_MODEL_ID } from "@/lib/communicate/chat_constants";
import { CHAT_UNAVAILABLE_MESSAGE } from "@/lib/communicate/chat_user_messages";
import {
  build_question_assist_system_prompt,
  build_question_assist_user_prompt,
} from "@/lib/discover/build_question_assist_prompt";

const request_schema = z.object({
  action: z.enum(["suggest", "refine"]),
  draft: z.string().optional(),
});

export const maxDuration = 30;

/**
 * Returns one suggested or refined question grounded in curated dataset analysis.
 */
export async function POST(req: Request): Promise<Response> {
  if (!process.env.AI_GATEWAY_API_KEY) {
    console.error("Discover question assist: service not configured");
    return Response.json(
      { error: CHAT_UNAVAILABLE_MESSAGE },
      { status: 503 },
    );
  }

  let body: z.infer<typeof request_schema>;

  try {
    const json = await req.json();
    body = request_schema.parse(json);
  } catch {
    return Response.json({ error: CHAT_UNAVAILABLE_MESSAGE }, { status: 400 });
  }

  const system = await build_question_assist_system_prompt();
  const user_prompt = build_question_assist_user_prompt(
    body.action,
    body.draft,
  );

  await log_ai_input({
    component: AUDIT_COMPONENT_DISCOVER_QUESTION_ASSIST,
    event_kind: "model_request",
    model_id: CHAT_GATEWAY_MODEL_ID,
    payload: {
      action: body.action,
      draft: body.draft ?? null,
      system_prompt: system,
      user_prompt,
    },
  });

  try {
    const result = await generateText({
      model: gateway(CHAT_GATEWAY_MODEL_ID),
      system,
      prompt: user_prompt,
    });

    const text = normalize_question_output(result.text);

    await log_ai_input({
      component: AUDIT_COMPONENT_DISCOVER_QUESTION_ASSIST,
      event_kind: "model_response",
      model_id: CHAT_GATEWAY_MODEL_ID,
      tokens: extract_token_usage(result.usage),
      payload: { text, action: body.action },
    });

    return Response.json({ text });
  } catch {
    console.error("Discover question assist: generate failed");
    return Response.json(
      { error: CHAT_UNAVAILABLE_MESSAGE },
      { status: 503 },
    );
  }
}

function normalize_question_output(raw: string): string {
  const trimmed = raw.trim().replace(/^["']|["']$/g, "");
  const single_line = trimmed.split("\n")[0]?.trim() ?? "";

  if (!single_line) {
    return "Who are the top vendors by total spend?";
  }

  const normalized =
    single_line.charAt(0).toUpperCase() + single_line.slice(1).replace(/\?+$/, "");

  return normalized.endsWith("?") ? normalized : `${normalized}?`;
}
