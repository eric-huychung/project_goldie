/**
 * Append-only audit log for AI components (inputs, outputs, token usage).
 */

import type { UIMessage } from "ai";

import { create_server_supabase_client } from "@/lib/supabase/server";
import type { token_usage_counts } from "@/lib/audit/token_usage";

export type ai_input_event_kind =
  | "model_request"
  | "model_response"
  | "tool_call"
  | "tool_result";

export type log_ai_input_params = {
  component: string;
  event_kind: ai_input_event_kind;
  model_id?: string | null;
  payload: Record<string, unknown>;
  tokens?: token_usage_counts;
};

/**
 * Records one AI audit event. Never throws — chat must not fail if logging fails.
 *
 * @param params - component, event_kind, optional model_id, payload, optional tokens
 */
export async function log_ai_input(params: log_ai_input_params): Promise<void> {
  try {
    const supabase = create_server_supabase_client();
    const tokens = params.tokens;

    const { error } = await supabase.from("ai_input_log").insert({
      component: params.component,
      event_kind: params.event_kind,
      model_id: params.model_id ?? null,
      input_tokens: tokens?.input_tokens ?? null,
      output_tokens: tokens?.output_tokens ?? null,
      total_tokens: tokens?.total_tokens ?? null,
      payload: params.payload,
    });

    if (error) {
      console.error("ai_input_log insert failed");
    }
  } catch {
    console.error("ai_input_log insert failed");
  }
}

/**
 * @param messages - Chat history sent to the model
 * @returns Role and text only (no ids or metadata)
 */
export function serialize_messages_for_log(
  messages: UIMessage[],
): { role: string; text: string }[] {
  return messages.map((message) => ({
    role: message.role,
    text: message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(""),
  }));
}

/**
 * @param result - Return value from a chat dataset tool
 * @returns Summary safe for audit storage (no full row payloads)
 */
export function summarize_tool_result_for_log(
  result: { ok: boolean; rows?: unknown[]; error?: string },
): Record<string, unknown> {
  if (!result.ok) {
    return { ok: false, error: result.error ?? "unknown" };
  }

  return { ok: true, row_count: result.rows?.length ?? 0 };
}
