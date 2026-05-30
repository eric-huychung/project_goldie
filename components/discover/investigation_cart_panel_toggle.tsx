/**
 * Themes / Stories toggle for the investigation cart panel.
 */

"use client";

import type { investigation_cart_panel } from "@/lib/types/discover";
import { cn } from "@/lib/utils";

type investigation_cart_panel_toggle_props = {
  active_panel: investigation_cart_panel;
  theme_count: number;
  story_count: number;
  on_change: (panel: investigation_cart_panel) => void;
};

/**
 * @param props - Active panel, counts, and change handler
 */
export function InvestigationCartPanelToggle({
  active_panel,
  theme_count,
  story_count,
  on_change,
}: investigation_cart_panel_toggle_props) {
  const tabs: { id: investigation_cart_panel; label: string; count: number }[] =
    [
      { id: "themes", label: "Themes", count: theme_count },
      { id: "stories", label: "Stories", count: story_count },
    ];

  return (
    <div className="flex rounded-lg border border-[#e5e7eb] bg-[#f8f9fa] p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => on_change(tab.id)}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            active_panel === tab.id
              ? "bg-white text-[#1f2937] shadow-sm"
              : "text-muted-foreground hover:text-[#1f2937]",
          )}
        >
          {tab.label}
          <span className="ml-1 text-muted-foreground">({tab.count})</span>
        </button>
      ))}
    </div>
  );
}
