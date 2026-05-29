/**
 * Mock suggested visualizations for the Discover tab.
 */

import type { discover_suggested_visualization } from "@/lib/types/discover";

export const MOCK_SUGGESTED_VISUALIZATIONS: discover_suggested_visualization[] = [
  {
    id: "viz-1",
    title: "Monthly Spending Trend",
    question: "How do vendor payments trend over time?",
    chart_type: "line",
    x_axis: "Payment Date",
    y_axis: "Amount",
  },
  {
    id: "viz-2",
    title: "Top Vendors by Spend",
    question: "Which vendors receive the most payments?",
    chart_type: "bar",
    x_axis: "Vendor Name",
    y_axis: "Amount",
  },
  {
    id: "viz-3",
    title: "Spending by Department",
    question: "How is spending distributed across departments?",
    chart_type: "bar",
    x_axis: "Department",
    y_axis: "Amount",
  },
  {
    id: "viz-4",
    title: "Payment Method Distribution",
    question: "What payment methods are most common?",
    chart_type: "bar",
    x_axis: "Payment Method",
    y_axis: "Count",
  },
  {
    id: "viz-5",
    title: "Quarterly Spend Comparison",
    question: "How does spending vary by quarter?",
    chart_type: "bar",
    x_axis: "Quarter",
    y_axis: "Amount",
  },
];
