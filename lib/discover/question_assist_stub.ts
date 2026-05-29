/**
 * Placeholder question suggest/refine helpers until LLM + RAG is wired (Communicate / Discover).
 */

const STUB_SUGGESTIONS = [
  "How does total vendor spend compare across fiscal years?",
  "Which agencies drive the largest share of payments in the latest fiscal year?",
  "Are there vendors with accelerating payment growth quarter over quarter?",
  "What categories account for the highest concentration of spend?",
];

/**
 * Returns a mock suggested question (rotates by time for light variety).
 *
 * @returns Suggested question text
 */
export function stub_suggest_question(): string {
  const index = Math.floor(Date.now() / 3000) % STUB_SUGGESTIONS.length;
  return STUB_SUGGESTIONS[index] ?? STUB_SUGGESTIONS[0];
}

/**
 * Returns a lightly polished version of the user's draft (stub for refine).
 *
 * @param draft - Current question text from the user
 * @returns Refined question text
 */
export function stub_refine_question(draft: string): string {
  const trimmed = draft.trim();
  if (!trimmed) {
    return stub_suggest_question();
  }

  const normalized =
    trimmed.charAt(0).toUpperCase() + trimmed.slice(1).replace(/\?+$/, "");

  return normalized.endsWith("?") ? normalized : `${normalized}?`;
}
