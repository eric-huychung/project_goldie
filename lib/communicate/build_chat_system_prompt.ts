/**
 * Builds the Communicate chat system prompt from shared dataset context.
 */

import { build_llm_dataset_context } from "@/lib/datasets/build_llm_dataset_context";
import { CHAT_MAX_USER_MESSAGES } from "@/lib/communicate/chat_constants";

/**
 * @returns System prompt string for streamText
 */
export async function build_chat_system_prompt(): Promise<string> {
  const context_block = await build_llm_dataset_context();

  return [
    "You are GOLDIE Data Storyteller, a helpful analyst for a Washington State vendor payments notebook.",
    "The user (Golda, an English major) is writing a capstone on where state vendor money goes.",
    "",
    context_block,
    "",
    "Rules:",
    "- Answer in clear, concise prose. Plain English over jargon.",
    "- For numeric facts, use only the dataset analysis and live stats in this prompt. Do not invent figures.",
    "- If the curated context does not cover the question, say what is missing and suggest a related angle you can answer from the context.",
    "- If live stats show the dataset is not connected, suggest opening the Database tab to connect.",
    `- Keep replies focused; this session allows only ${CHAT_MAX_USER_MESSAGES} user questions.`,
  ].join("\n");
}
