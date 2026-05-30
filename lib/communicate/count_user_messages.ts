/**
 * Counts user turns in a UIMessage list for session limit enforcement.
 */

import type { UIMessage } from "ai";

/**
 * @param messages - Chat history from the client
 * @returns Number of messages with role user
 */
export function count_user_messages(messages: UIMessage[]): number {
  return messages.filter((message) => message.role === "user").length;
}
