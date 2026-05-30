/**
 * Builds the Communicate chat system prompt from schema, stats, and curated context.
 */

import {
  VENDOR_PAYMENTS_DATASET_NAME,
  VENDOR_PAYMENTS_NOTEBOOK_TITLE,
} from "@/lib/datasets/vendor_payments_constants";
import { format_vendor_payments_schema_for_prompt } from "@/lib/datasets/vendor_payments_schema_context";
import { format_vendor_payments_chat_context_for_prompt } from "@/lib/mock/vendor_payments_chat_context";
import { create_server_supabase_client } from "@/lib/supabase/server";
import { CHAT_MAX_USER_MESSAGES } from "@/lib/communicate/chat_constants";

/**
 * @returns System prompt string for streamText
 */
export async function build_chat_system_prompt(): Promise<string> {
  const schema_block = format_vendor_payments_schema_for_prompt();
  const curated_block = format_vendor_payments_chat_context_for_prompt();
  const stats_block = await load_dataset_stats_block();

  const blocks = [
    "You are GOLDIE Data Storyteller, a helpful analyst for a Washington State vendor payments notebook.",
    `Notebook: ${VENDOR_PAYMENTS_NOTEBOOK_TITLE}`,
    `Dataset: ${VENDOR_PAYMENTS_DATASET_NAME}`,
    "",
    schema_block,
    "",
    "Current dataset stats:",
    stats_block,
  ];

  if (curated_block) {
    blocks.push("", curated_block);
  }

  blocks.push(
    "",
    "Rules:",
    "- Answer in clear, concise prose for a government data analyst.",
    "- For numeric facts, use Quick insights, FAQs, and dataset stats above first. Do not invent figures.",
    "- If those sources do not cover the question, you may use read-only query tools. If a tool fails, say the data is temporarily unavailable.",
    "- If the dataset is not connected, suggest opening the Database tab to connect.",
    `- Keep replies focused; this session allows only ${CHAT_MAX_USER_MESSAGES} user questions.`,
  );

  return blocks.join("\n");
}

async function load_dataset_stats_block(): Promise<string> {
  try {
    const supabase = create_server_supabase_client();
    const { data, error } = await supabase
      .from("vendor_payments_dataset_summary")
      .select(
        "row_count, fiscal_year_count, fy_min, fy_max, total_amount, last_imported_at, column_count",
      )
      .single();

    if (error || !data) {
      return "- Status: not connected.";
    }

    return [
      "- Connected: yes",
      `- Rows: ${data.row_count}`,
      `- Columns (data): ${data.column_count}`,
      `- Fiscal years: ${data.fy_min}–${data.fy_max} (${data.fiscal_year_count} distinct)`,
      `- Total amount: $${data.total_amount}`,
      `- Last updated: ${data.last_imported_at}`,
    ].join("\n");
  } catch {
    return "- Status: not connected.";
  }
}
