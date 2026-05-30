/**
 * Wraps Communicate chat tool execution with audit logging.
 */

import { AUDIT_COMPONENT_COMMUNICATE_CHAT } from "@/lib/audit/constants";
import {
  log_ai_input,
  summarize_tool_result_for_log,
} from "@/lib/audit/log_ai_input";

/**
 * @param tool_name - Tool identifier sent to the model
 * @param args - Tool arguments from the model
 * @param execute - Server-side query runner
 * @returns Tool result passed back to the model
 */
export async function run_logged_chat_tool<T extends { ok: boolean }>(
  tool_name: string,
  args: Record<string, unknown>,
  execute: () => Promise<T>,
): Promise<T> {
  await log_ai_input({
    component: AUDIT_COMPONENT_COMMUNICATE_CHAT,
    event_kind: "tool_call",
    payload: { tool: tool_name, args },
  });

  const result = await execute();

  await log_ai_input({
    component: AUDIT_COMPONENT_COMMUNICATE_CHAT,
    event_kind: "tool_result",
    payload: {
      tool: tool_name,
      ...summarize_tool_result_for_log(
        result as { ok: boolean; rows?: unknown[]; error?: string },
      ),
    },
  });

  return result;
}
