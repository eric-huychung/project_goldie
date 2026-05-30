/**
 * Theme-linked dashboard chart specs and copy for the Communicate canvas.
 */

import { VENDOR_PAYMENTS_INVESTIGATION_THEME } from "@/lib/datasets/vendor_payments_analysis";
import type {
  dashboard_chart_data_bundle,
  dashboard_chart_spec,
  dashboard_resolved_chart,
} from "@/lib/types/dashboard";

export const DASHBOARD_DEFAULT_THEME_ID = VENDOR_PAYMENTS_INVESTIGATION_THEME.id;

export const DASHBOARD_THEME_COPY: Record<
  string,
  { title: string; story: string }
> = {
  [VENDOR_PAYMENTS_INVESTIGATION_THEME.id]: {
    title: VENDOR_PAYMENTS_INVESTIGATION_THEME.title,
    story: VENDOR_PAYMENTS_INVESTIGATION_THEME.story,
  },
};

const WHERE_MONEY_GOES_CHARTS: dashboard_chart_spec[] = [
  {
    id: "spend-by-category",
    theme_id: VENDOR_PAYMENTS_INVESTIGATION_THEME.id,
    question_id: null,
    title: "Spend by category",
    subtitle:
      "Most vendor dollars are grants and client services — not regular goods or contracts.",
    kind: "pie",
  },
  {
    id: "top-vendors",
    theme_id: VENDOR_PAYMENTS_INVESTIGATION_THEME.id,
    question_id: "where-money-goes-q1",
    title: "Top vendors by spend",
    subtitle:
      "Who are the top vendors, and how much of total spend do they get?",
    kind: "bar",
  },
  {
    id: "top-agencies",
    theme_id: VENDOR_PAYMENTS_INVESTIGATION_THEME.id,
    question_id: "where-money-goes-q2",
    title: "Top agencies by spend",
    subtitle: "Which agencies spend the most?",
    kind: "bar",
  },
  {
    id: "spend-by-fy",
    theme_id: VENDOR_PAYMENTS_INVESTIGATION_THEME.id,
    question_id: "where-money-goes-q3",
    title: "Spend by fiscal year",
    subtitle:
      "Did the biggest agencies spend more in 2023 than in 2022? Statewide spend rose ~14% from FY 2022 to FY 2023.",
    kind: "fy_bar",
  },
];

export const DASHBOARD_THEME_CHART_SPECS: Record<string, dashboard_chart_spec[]> =
  {
    [VENDOR_PAYMENTS_INVESTIGATION_THEME.id]: WHERE_MONEY_GOES_CHARTS,
  };

function resolve_chart_rows(
  spec: dashboard_chart_spec,
  data: dashboard_chart_data_bundle,
): dashboard_resolved_chart["rows"] {
  switch (spec.kind) {
    case "pie":
      return data.spend_by_category.slice(0, 6);
    case "bar":
      if (spec.id === "top-vendors") {
        return data.top_vendors.slice(0, 8);
      }
      return data.top_agencies.slice(0, 8);
    case "fy_bar":
      return data.spend_by_fy;
    default:
      return [];
  }
}

/**
 * @param theme_id - Investigation theme id from the cart
 * @param data - Aggregated chart data bundle
 * @returns Resolved charts for a theme, or empty if none configured
 */
export function get_dashboard_charts_for_theme(
  theme_id: string,
  data: dashboard_chart_data_bundle,
): dashboard_resolved_chart[] {
  const specs = DASHBOARD_THEME_CHART_SPECS[theme_id];
  if (!specs) {
    return [];
  }

  return specs.map((spec) => ({
    ...spec,
    rows: resolve_chart_rows(spec, data),
  }));
}

/**
 * @param theme_id - Theme id
 * @returns Theme title and story for the dashboard header
 */
export function get_dashboard_theme_copy(theme_id: string): {
  title: string;
  story: string;
} {
  const copy = DASHBOARD_THEME_COPY[theme_id];
  if (copy) {
    return copy;
  }

  return {
    title: "Investigation theme",
    story: "Track questions and add a story in your investigation cart.",
  };
}
