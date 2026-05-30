/**
 * On-demand suggest / refine actions for question drafting on Discover.
 */

"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QUESTION_ASSIST_UNAVAILABLE_MESSAGE } from "@/lib/discover/question_assist_messages";

type question_assist_actions_props = {
  draft: string;
  on_draft_change: (value: string) => void;
  on_track?: () => void;
  show_track?: boolean;
};

/**
 * @param props - Current draft text and change handler
 */
export function QuestionAssistActions({
  draft,
  on_draft_change,
  on_track,
  show_track = false,
}: question_assist_actions_props) {
  const [is_loading, set_is_loading] = useState(false);
  const [error_message, set_error_message] = useState<string | null>(null);

  const run_assist = async (action: "suggest" | "refine") => {
    set_is_loading(true);
    set_error_message(null);

    try {
      const response = await fetch("/api/discover/question-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          draft: action === "refine" ? draft : undefined,
        }),
      });

      const payload = (await response.json()) as {
        text?: string;
        error?: string;
      };

      if (!response.ok || !payload.text) {
        set_error_message(
          payload.error ?? QUESTION_ASSIST_UNAVAILABLE_MESSAGE,
        );
        return;
      }

      on_draft_change(payload.text);
    } catch {
      set_error_message(QUESTION_ASSIST_UNAVAILABLE_MESSAGE);
    } finally {
      set_is_loading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          className="h-9 gap-1.5 text-xs"
          onClick={() => run_assist("suggest")}
          disabled={is_loading}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          {is_loading ? "Thinking…" : "Suggest one"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="h-9 gap-1.5 text-xs"
          onClick={() => run_assist("refine")}
          disabled={is_loading || !draft.trim()}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Refine wording
        </Button>
        {show_track && on_track ? (
          <Button
            type="button"
            className="h-9 bg-[#0369a1] hover:bg-[#0c4a6e] text-white text-xs"
            onClick={on_track}
            disabled={!draft.trim() || is_loading}
          >
            Track question
          </Button>
        ) : null}
      </div>
      {error_message ? (
        <p className="text-xs text-red-600">{error_message}</p>
      ) : null}
    </div>
  );
}
