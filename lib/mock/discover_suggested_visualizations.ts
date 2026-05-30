/**
 * Mock suggested visualizations for the Discover tab — chart types only.
 */

import type { discover_suggested_visualization } from "@/lib/types/discover";

export const MOCK_SUGGESTED_VISUALIZATIONS: discover_suggested_visualization[] = [
  {
    id: "viz-vertical-bar",
    title: "Vertical bar chart",
    chart_type: "vertical_bar",
  },
  {
    id: "viz-horizontal-bar",
    title: "Horizontal bar chart",
    chart_type: "horizontal_bar",
  },
  {
    id: "viz-pie",
    title: "Pie chart",
    chart_type: "pie",
  },
];
