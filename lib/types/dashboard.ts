/**
 * Dashboard canvas types — chart data shapes and theme-linked chart specs.
 */

export type dashboard_named_total = {
  name: string;
  total: number;
};

export type dashboard_fy_spend = {
  fy: number;
  total: number;
  payments?: number;
};

export type dashboard_chart_kind = "bar" | "pie" | "fy_bar";

export type dashboard_chart_spec = {
  id: string;
  theme_id: string;
  question_id: string | null;
  title: string;
  subtitle: string;
  kind: dashboard_chart_kind;
};

export type dashboard_chart_data_bundle = {
  top_vendors: dashboard_named_total[];
  top_agencies: dashboard_named_total[];
  spend_by_category: dashboard_named_total[];
  spend_by_fy: dashboard_fy_spend[];
};

export type dashboard_resolved_chart = dashboard_chart_spec & {
  rows: dashboard_named_total[] | dashboard_fy_spend[];
};
