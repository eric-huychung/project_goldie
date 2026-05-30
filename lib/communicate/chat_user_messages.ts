/**
 * User-facing chat copy for errors and limits.
 */

import { CHAT_MAX_USER_MESSAGES } from "@/lib/communicate/chat_constants";

/** Shown when the chat service is misconfigured or unreachable. */
export const CHAT_UNAVAILABLE_MESSAGE =
  "We couldn't connect to the assistant. Please try again in a moment.";

/**
 * @returns Message when the five-question session limit is hit
 */
export function chat_session_limit_message(): string {
  return `You've used all ${CHAT_MAX_USER_MESSAGES} questions for this session. Start a new session to continue.`;
}

/**
 * Maps API or SDK errors to safe copy for the UI.
 *
 * @param raw - Error message from useChat or the network
 * @returns Sanitized string for display
 */
export function format_chat_user_error(raw: string | undefined): string {
  if (!raw?.trim()) {
    return CHAT_UNAVAILABLE_MESSAGE;
  }

  const lower = raw.toLowerCase();

  if (lower.includes("session limit") || lower.includes("new session")) {
    return raw.trim();
  }

  if (
    lower.includes("ai_gateway") ||
    lower.includes(".env") ||
    lower.includes("api key") ||
    lower.includes("gateway") ||
    lower.includes("unauthorized") ||
    lower.includes("forbidden") ||
    lower.includes("503") ||
    lower.includes("fetch failed") ||
    lower.includes("network")
  ) {
    return CHAT_UNAVAILABLE_MESSAGE;
  }

  return CHAT_UNAVAILABLE_MESSAGE;
}
