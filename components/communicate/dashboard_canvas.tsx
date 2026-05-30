/**
 * Theme-linked dashboard canvas for the Communicate right panel (Phase 4d).
 */

"use client";

import { useMemo, useState } from "react";

import { DashboardChartBlock } from "@/components/communicate/dashboard_chart_block";
import { DashboardCommentPins } from "@/components/communicate/dashboard_comment_pins";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { use_investigation_cart } from "@/components/workspace/investigation_cart_provider";
import {
  DASHBOARD_DEFAULT_THEME_ID,
  get_dashboard_charts_for_theme,
  get_dashboard_theme_copy,
} from "@/lib/datasets/dashboard_theme_charts";
import {
  INVESTIGATION_THEME_COLOR_STYLES,
} from "@/lib/discover/investigation_theme_colors";
import { get_comment_pins_for_chart } from "@/lib/mock/dashboard_collaboration_preview";
import type { dashboard_chart_data_bundle } from "@/lib/types/dashboard";
import type { investigation_theme } from "@/lib/types/discover";
import { cn } from "@/lib/utils";

type dashboard_canvas_props = {
  chart_data: dashboard_chart_data_bundle;
};

const DEFAULT_THEME_TAB: investigation_theme = {
  id: DASHBOARD_DEFAULT_THEME_ID,
  name: "Where Does the Money Go?",
  color_key: "amber",
};

/**
 * @param props - Chart aggregates from vendor_payments_analysis.ts
 */
export function DashboardCanvas({ chart_data }: dashboard_canvas_props) {
  const { themes } = use_investigation_cart();

  const dashboard_tabs = useMemo(() => {
    if (themes.length > 0) {
      return themes;
    }

    return [DEFAULT_THEME_TAB];
  }, [themes]);

  const [active_theme_id, set_active_theme_id] = useState(
    dashboard_tabs[0]?.id ?? DASHBOARD_DEFAULT_THEME_ID,
  );

  const active_tab =
    dashboard_tabs.find((theme) => theme.id === active_theme_id) ??
    dashboard_tabs[0] ??
    DEFAULT_THEME_TAB;

  const theme_copy = get_dashboard_theme_copy(active_tab.id);
  const dashboard_title =
    theme_copy.title === "Investigation theme"
      ? active_tab.name
      : theme_copy.title;
  const charts = get_dashboard_charts_for_theme(active_tab.id, chart_data);
  const color_style = INVESTIGATION_THEME_COLOR_STYLES[active_tab.color_key];
  const story_pins = get_comment_pins_for_chart("theme-story");

  return (
    <div className="flex-1 p-6 overflow-auto">
      <Card className="bg-white border-[#e5e7eb] shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <Badge
              variant="secondary"
              className="bg-[#ffedd5] text-[#9a3412] border-[#fed7aa] font-normal"
            >
              Collaboration preview — fictional sample comments, not stored or shared
            </Badge>
          </div>

          <div
            className={cn(
              "relative mb-8 pl-4 border-l-4",
              color_style.border_class,
            )}
          >
            <h1 className="text-2xl font-semibold text-[#1f2937] mb-2">
              {dashboard_title}
            </h1>
            <p className="text-muted-foreground pr-8">{theme_copy.story}</p>
            <DashboardCommentPins pins={story_pins} />
          </div>

          {charts.length > 0 ? (
            <div className="space-y-6">
              {charts.map((chart, index) => (
                <DashboardChartBlock
                  key={chart.id}
                  chart={chart}
                  chart_number={index + 1}
                  chart_total={charts.length}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[#e5e7eb] rounded-xl p-10 text-center">
              <p className="text-sm text-muted-foreground">
                Charts for this theme are not configured yet. Track the
                Washington vendor payments theme in Discover to see the MVP
                dashboard.
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-[#e5e7eb] pt-4 mt-8 flex-wrap">
            {dashboard_tabs.map((theme) => {
              const is_active = theme.id === active_tab.id;
              const dot = INVESTIGATION_THEME_COLOR_STYLES[theme.color_key]
                .dot_class;

              return (
                <Button
                  key={theme.id}
                  variant="ghost"
                  className={cn(
                    "gap-2 h-8 px-3 text-xs",
                    is_active
                      ? "bg-[#f8f9fa] text-[#1f2937]"
                      : "text-muted-foreground",
                  )}
                  onClick={() => set_active_theme_id(theme.id)}
                >
                  <span className={cn("w-2 h-2 rounded-full shrink-0", dot)} />
                  {theme.name}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
