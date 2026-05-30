/**
 * Extracts plain text from AI SDK UIMessage parts for rendering.
 */

import type { UIMessage } from "ai";

/**
 * @param message - Chat message from useChat
 * @returns Concatenated text parts
 */
export function get_message_text(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}
