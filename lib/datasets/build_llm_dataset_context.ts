/**
 * Shared dataset context block for LLM features (Communicate chat, Discover question assist).
 */

import { format_vendor_payments_analysis_for_prompt } from "@/lib/datasets/vendor_payments_analysis";
import {
  VENDOR_PAYMENTS_DATASET_NAME,
  VENDOR_PAYMENTS_NOTEBOOK_TITLE,
} from "@/lib/datasets/vendor_payments_constants";
import { format_vendor_payments_schema_for_prompt } from "@/lib/datasets/vendor_payments_schema_context";
import { create_server_supabase_client } from "@/lib/supabase/server";

/**
 * @returns Schema, live stats, and curated analysis for LLM system prompts
 */
export async function build_llm_dataset_context(): Promise<string> {
  const schema_block = format_vendor_payments_schema_for_prompt();
  const stats_block = await load_dataset_stats_block();
  const analysis_block = format_vendor_payments_analysis_for_prompt();

  return [
    `Notebook: ${VENDOR_PAYMENTS_NOTEBOOK_TITLE}`,
    `Dataset: ${VENDOR_PAYMENTS_DATASET_NAME}`,
    "",
    schema_block,
    "",
    "Current dataset stats (live from database):",
    stats_block,
    "",
    analysis_block,
  ].join("\n");
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
