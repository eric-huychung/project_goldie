/**
 * Communicate workspace tab — Data Storyteller chat and dashboard placeholder (Phase 4a).
 */

"use client";

import { Sparkles } from "lucide-react";

import { ChatPanel } from "@/components/communicate/chat_panel";
import { CommunicateCanvasPlaceholder } from "@/components/communicate/communicate_canvas_placeholder";
import { StorySuggestionsSection } from "@/components/communicate/story_suggestions_section";
import { CHAT_MAX_USER_MESSAGES } from "@/lib/communicate/chat_constants";

/**
 * Left agent panel + right canvas placeholder.
 */
export function CommunicateView() {
  return (
    <div className="flex h-full">
      <aside className="w-[380px] bg-white border-r border-[#e5e7eb] flex flex-col shrink-0">
        <div className="p-4 border-b border-[#e5e7eb] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[#1f2937]">Data Storyteller</h2>
              <p className="text-xs text-muted-foreground">
                Free session · {CHAT_MAX_USER_MESSAGES} questions max
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <StorySuggestionsSection />
          </div>
          <ChatPanel />
        </div>
      </aside>

      <CommunicateCanvasPlaceholder />
    </div>
  );
}
