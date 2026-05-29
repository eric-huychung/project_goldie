/**
 * Formatters for dataset summary lines on the Discover tab.
 */

import type { vendor_payments_status } from "@/lib/types/dataset";

/**
 * Builds the subtitle stats line from the status API payload.
 *
 * @param status - Latest vendor payments status
 * @returns Formatted stats or a fallback when disconnected
 */
export function format_discover_stats_line(
  status: vendor_payments_status | null,
): string {
  if (!status?.connected || status.row_count === null) {
    return "Connect this dataset on the Database tab to load live stats.";
  }

  const parts = [
    `${status.row_count.toLocaleString()} rows`,
    `${status.column_count ?? "—"} columns`,
  ];

  if (
    status.fiscal_year_min !== null &&
    status.fiscal_year_max !== null
  ) {
    parts.push(`FY ${status.fiscal_year_min}–${status.fiscal_year_max}`);
  }

  return parts.join(" • ");
}
