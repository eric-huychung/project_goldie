/**
 * Ask your own question — draft input with suggest/refine assist on Discover.
 */

"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";

import { QuestionAssistActions } from "@/components/discover/question_assist_actions";
import { Input } from "@/components/ui/input";
import { use_investigation_cart } from "@/components/workspace/investigation_cart_provider";

/**
 * Free-form question entry with LLM suggest / refine assist.
 */
export function AskOwnQuestionSection() {
  const { track_question } = use_investigation_cart();
  const [draft, set_draft] = useState("");

  const handle_track = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    const id = `custom-discover-${Date.now()}`;
    track_question(id, trimmed, { theme_id: null });
    set_draft("");
  };

  return (
    <section className="mb-8 rounded-xl border border-[#e5e7eb] bg-white p-5">
      <div className="flex items-center gap-2 mb-2">
        <PenLine className="w-5 h-5 text-[#0369a1]" />
        <h2 className="text-lg font-semibold text-[#1f2937]">
          Ask your own question
        </h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Type a question in your own words, refine it, then add it to your
        investigation cart.
      </p>
      <div className="space-y-3">
        <Input
          value={draft}
          onChange={(e) => set_draft(e.target.value)}
          placeholder="e.g. Which agencies increased vendor spend the most in FY 2023?"
          className="text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handle_track();
            }
          }}
        />
        <QuestionAssistActions
          draft={draft}
          on_draft_change={set_draft}
          show_track
          on_track={handle_track}
        />
      </div>
    </section>
  );
}
