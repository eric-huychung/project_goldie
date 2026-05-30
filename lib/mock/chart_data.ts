/**
 * Dashboard chart data from curated vendor payments analysis (docs/insights.md).
 */

import { VENDOR_PAYMENTS_ANALYSIS } from "@/lib/datasets/vendor_payments_analysis";
import type { dashboard_chart_data_bundle } from "@/lib/types/dashboard";

/**
 * @returns Chart-ready aggregates from vendor_payments_analysis.ts
 */
export function get_dashboard_chart_data(): dashboard_chart_data_bundle {
  const { top_vendors, top_agencies, spend_by_category, spend_by_fy } =
    VENDOR_PAYMENTS_ANALYSIS;

  return {
    top_vendors: top_vendors.map((row) => ({
      name: row.name,
      total: row.total,
    })),
    top_agencies: top_agencies.map((row) => ({
      name: row.name,
      total: row.total,
    })),
    spend_by_category: spend_by_category.map((row) => ({
      name: row.name,
      total: row.total,
    })),
    spend_by_fy: spend_by_fy.map((row) => ({
      fy: row.fy,
      total: row.total,
      payments: row.payments,
    })),
  };
}
