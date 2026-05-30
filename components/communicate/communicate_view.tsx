/**
 * Communicate workspace tab — Data Storyteller chat and theme-linked dashboard.
 */

"use client";

import { ChatPanel } from "@/components/communicate/chat_panel";
import { DashboardCanvas } from "@/components/communicate/dashboard_canvas";
import { StorySuggestionsSection } from "@/components/communicate/story_suggestions_section";
import { CHAT_MAX_USER_MESSAGES } from "@/lib/communicate/chat_constants";
import type { dashboard_chart_data_bundle } from "@/lib/types/dashboard";

type communicate_view_props = {
  chart_data: dashboard_chart_data_bundle;
};

/**
 * Left agent panel + theme-linked dashboard canvas.
 *
 * @param props - Chart data from vendor_payments_analysis.ts
 */
export function CommunicateView({ chart_data }: communicate_view_props) {
  return (
    <div className="flex h-full">
      <aside className="w-[380px] bg-white border-r border-[#e5e7eb] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#e5e7eb] shrink-0">
          <h2 className="font-semibold text-[#1f2937]">Data Storyteller</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Free session · {CHAT_MAX_USER_MESSAGES} questions max
          </p>
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <StorySuggestionsSection />
          </div>
          <ChatPanel />
        </div>
      </aside>

      <DashboardCanvas chart_data={chart_data} />
    </div>
  );
}
