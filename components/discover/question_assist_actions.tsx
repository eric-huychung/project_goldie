/**
 * On-demand suggest / refine actions for question drafting (stub until LLM is wired).
 */

"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  stub_refine_question,
  stub_suggest_question,
} from "@/lib/discover/question_assist_stub";

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
  const handle_suggest = () => {
    on_draft_change(stub_suggest_question());
  };

  const handle_refine = () => {
    on_draft_change(stub_refine_question(draft));
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="secondary"
        className="h-9 gap-1.5 text-xs"
        onClick={handle_suggest}
        title="Suggest a question (stub)"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        Suggest one
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="h-9 gap-1.5 text-xs"
        onClick={handle_refine}
        disabled={!draft.trim()}
        title="Refine wording (stub)"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        Refine wording
      </Button>
      {show_track && on_track ? (
        <Button
          type="button"
          className="h-9 bg-[#0369a1] hover:bg-[#0c4a6e] text-white text-xs"
          onClick={on_track}
          disabled={!draft.trim()}
        >
          Track question
        </Button>
      ) : null}
    </div>
  );
}
