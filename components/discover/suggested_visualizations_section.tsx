/**
 * Suggested visualizations grid — chart ideas tied to example questions (mock).
 */

"use client";

import { useState } from "react";
import { BarChart3, LayoutGrid } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_SUGGESTED_VISUALIZATIONS } from "@/lib/mock/discover_suggested_visualizations";
import type { discover_suggested_visualization } from "@/lib/types/discover";
import { cn } from "@/lib/utils";

function VizCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#d1d5db]",
        checked && "border-[#0369a1] bg-[#0369a1]",
      )}
      aria-hidden
    >
      {checked ? (
        <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none">
          <path
            d="M2 6l3 3 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

function MiniChartPreview({
  chart_type,
}: {
  chart_type: discover_suggested_visualization["chart_type"];
}) {
  return (
    <div className="h-24 bg-[#f8f9fa] rounded-lg mb-3 flex items-end justify-center gap-1 p-3">
      {chart_type === "line" ? (
        <svg className="w-full h-full" viewBox="0 0 100 50">
          <path
            d="M 0 40 L 20 35 L 40 25 L 60 30 L 80 15 L 100 20"
            fill="none"
            stroke="#0369a1"
            strokeWidth="2"
          />
          {[0, 20, 40, 60, 80, 100].map((x, i) => {
            const ys = [40, 35, 25, 30, 15, 20];
            return <circle key={x} cx={x} cy={ys[i]} r="2" fill="#0369a1" />;
          })}
        </svg>
      ) : (
        <>
          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "60%" }} />
          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "80%" }} />
          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "45%" }} />
          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "70%" }} />
          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "55%" }} />
        </>
      )}
    </div>
  );
}

/**
 * Selectable visualization suggestions (dashboard CTA is UI-only for MVP).
 */
export function SuggestedVisualizationsSection() {
  const [selected_ids, set_selected_ids] = useState<string[]>([]);

  const toggle_viz = (id: string) => {
    set_selected_ids((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const select_all = () => {
    if (selected_ids.length === MOCK_SUGGESTED_VISUALIZATIONS.length) {
      set_selected_ids([]);
    } else {
      set_selected_ids(MOCK_SUGGESTED_VISUALIZATIONS.map((v) => v.id));
    }
  };

  const all_selected =
    selected_ids.length === MOCK_SUGGESTED_VISUALIZATIONS.length;

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-[#1f2937]">
            Suggested visualizations
          </h2>
          <Badge variant="secondary" className="ml-1">
            {MOCK_SUGGESTED_VISUALIZATIONS.length}
          </Badge>
        </div>
        <button
          type="button"
          onClick={select_all}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#1f2937]"
        >
          <VizCheckbox checked={all_selected} />
          Select all
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Chart ideas based on your data structure. Link these to tracked questions
        in a later iteration.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_SUGGESTED_VISUALIZATIONS.map((viz) => {
          const is_selected = selected_ids.includes(viz.id);

          return (
            <Card
              key={viz.id}
              className={cn(
                "bg-white border-[#e5e7eb] cursor-pointer transition-all",
                is_selected
                  ? "border-blue-400 ring-1 ring-blue-400"
                  : "hover:border-blue-300",
              )}
              onClick={() => toggle_viz(viz.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-sm text-[#1f2937]">
                      {viz.title}
                    </span>
                  </div>
                  <VizCheckbox checked={is_selected} />
                </div>

                <MiniChartPreview chart_type={viz.chart_type} />

                <p className="text-xs text-muted-foreground mb-3">
                  {viz.question}
                </p>

                <div className="flex items-center gap-4 text-xs flex-wrap">
                  <div>
                    <span className="text-muted-foreground">X-Axis: </span>
                    <Badge variant="secondary" className="text-xs">
                      {viz.x_axis}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Y-Axis: </span>
                    <Badge variant="secondary" className="text-xs">
                      {viz.y_axis}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selected_ids.length > 0 ? (
        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            className="bg-[#0369a1] hover:bg-[#0c4a6e] text-white gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            Create dashboard with {selected_ids.length} visualization
            {selected_ids.length > 1 ? "s" : ""}
          </Button>
        </div>
      ) : null}
    </section>
  );
}
