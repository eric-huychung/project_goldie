/**
 * Track / untrack control for a single discover question.
 */

"use client";

import { Check, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { use_investigation_cart } from "@/components/workspace/investigation_cart_provider";

type track_question_button_props = {
  question_id: string;
  question_text: string;
  /** When set, creates/uses this theme in the cart (e.g. from Key questions found). */
  theme_id?: string;
  theme_name?: string;
};

/**
 * @param props - Question id, text, and optional theme for the investigation cart
 */
export function TrackQuestionButton({
  question_id,
  question_text,
  theme_id,
  theme_name,
}: track_question_button_props) {
  const { is_question_tracked, track_question, untrack_question } =
    use_investigation_cart();

  const is_tracked = is_question_tracked(question_id);

  if (is_tracked) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-7 text-xs text-amber-600 hover:text-red-500 px-2 w-auto"
        onClick={() => untrack_question(question_id)}
      >
        <Check className="w-3 h-3 mr-1" />
        Tracked
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 text-xs text-muted-foreground hover:text-amber-600 px-2 w-auto"
      onClick={() =>
        track_question(question_id, question_text, {
          theme_id: theme_id ?? null,
          theme_name,
        })
      }
    >
      <Plus className="w-3 h-3 mr-1" />
      Track
    </Button>
  );
}
