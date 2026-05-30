/**
 * Static schema and blurb text for the vendor payments dataset (chat system prompt).
 */

import { VENDOR_PAYMENTS_DISCOVER_BLURB } from "@/lib/mock/discover_dataset_blurb";

export const VENDOR_PAYMENTS_TABLE_NAME = "vendor_payments";

/** Data columns exposed to the chat agent (see docs/sample_data_reference.md). */
export const VENDOR_PAYMENTS_COLUMNS: {
  name: string;
  type: string;
  description: string;
}[] = [
  { name: "bien", type: "text", description: "Line identifier" },
  { name: "fy", type: "smallint", description: "Fiscal year (2022, 2023)" },
  { name: "fmonth", type: "smallint", description: "Fiscal month" },
  { name: "agy", type: "smallint", description: "Agency code" },
  { name: "agency", type: "text", description: "Agency name" },
  { name: "object_code", type: "text", description: "Object code" },
  { name: "category", type: "text", description: "Category" },
  { name: "subobj", type: "text", description: "Sub-object" },
  { name: "subcategory", type: "text", description: "Subcategory" },
  { name: "vendor", type: "text", description: "Vendor name" },
  { name: "amount", type: "numeric", description: "Payment amount (USD)" },
];

/**
 * @returns Multi-line schema summary for LLM system prompts
 */
export function format_vendor_payments_schema_for_prompt(): string {
  const lines = VENDOR_PAYMENTS_COLUMNS.map(
    (col) => `- ${col.name} (${col.type}): ${col.description}`,
  );

  return [
    `Table: ${VENDOR_PAYMENTS_TABLE_NAME}`,
    "",
    "Columns:",
    ...lines,
    "",
    `Summary: ${VENDOR_PAYMENTS_DISCOVER_BLURB}`,
  ].join("\n");
}
