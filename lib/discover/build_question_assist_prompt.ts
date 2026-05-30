/**
 * Builds the system prompt for Discover question suggest / refine.
 */

import { build_llm_dataset_context } from "@/lib/datasets/build_llm_dataset_context";

/**
 * @returns System prompt for suggest-one or refine-wording actions
 */
export async function build_question_assist_system_prompt(): Promise<string> {
  const context_block = await build_llm_dataset_context();

  return [
    "You help users draft analytical questions about Washington State vendor payments.",
    "The user is Golda, an English major writing a capstone on where state money goes.",
    "",
    context_block,
    "",
    "Output rules:",
    "- Return ONLY the question text — one sentence, ending with ?.",
    "- No quotes, labels, bullet points, or explanation.",
    "- Ground questions in the dataset (agencies, vendors, categories, fiscal years).",
    "- Use plain English. Say agency, not department.",
  ].join("\n");
}

/**
 * @param action - suggest or refine
 * @param draft - Current draft when refining
 * @returns User message for the model
 */
export function build_question_assist_user_prompt(
  action: "suggest" | "refine",
  draft?: string,
): string {
  if (action === "suggest") {
    return [
      "Suggest one clear analytical question the user could investigate.",
      "Pick an angle not already covered by the key questions listed in the context.",
    ].join(" ");
  }

  const trimmed = draft?.trim();

  if (!trimmed) {
    return "Suggest one clear analytical question the user could investigate.";
  }

  return `Refine this draft question for clarity and specificity. Keep the user's intent:\n\n${trimmed}`;
}
