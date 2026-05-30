/**
 * Single chart block on the Communicate dashboard canvas.
 */

import { DashboardCommentPins } from "@/components/communicate/dashboard_comment_pins";
import {
  SvgFyBarChart,
  SvgHorizontalBarChart,
  SvgPieChart,
} from "@/components/communicate/dashboard_svg_charts";
import { get_comment_pins_for_chart } from "@/lib/mock/dashboard_collaboration_preview";
import type {
  dashboard_fy_spend,
  dashboard_named_total,
  dashboard_resolved_chart,
} from "@/lib/types/dashboard";

type dashboard_chart_block_props = {
  chart: dashboard_resolved_chart;
  chart_number: number;
  chart_total: number;
};

/**
 * @param props - Resolved chart spec, sequential number, and dashboard chart count
 */
export function DashboardChartBlock({
  chart,
  chart_number,
  chart_total,
}: dashboard_chart_block_props) {
  const comment_pins = get_comment_pins_for_chart(chart.id);

  return (
    <article
      className="border border-[#e5e7eb] rounded-xl p-6"
      aria-labelledby={`chart-${chart.id}-title`}
    >
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">
          Chart {chart_number} of {chart_total}
        </p>
        <h3
          id={`chart-${chart.id}-title`}
          className="font-semibold text-[#1f2937]"
        >
          {chart.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{chart.subtitle}</p>
      </div>

      <div className="relative">
        {chart.kind === "pie" ? (
          <SvgPieChart rows={chart.rows as dashboard_named_total[]} />
        ) : null}

        {chart.kind === "bar" ? (
          <SvgHorizontalBarChart rows={chart.rows as dashboard_named_total[]} />
        ) : null}

        {chart.kind === "fy_bar" ? (
          <SvgFyBarChart rows={chart.rows as dashboard_fy_spend[]} />
        ) : null}

        <DashboardCommentPins pins={comment_pins} />
      </div>

      <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-[#f3f4f6]">
        Source: Washington State Vendor Payments FY 2022–2023
      </p>
    </article>
  );
}
