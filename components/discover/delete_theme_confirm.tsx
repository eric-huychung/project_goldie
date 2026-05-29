/**
 * Simple confirmation dialog before deleting a theme and its questions.
 */

"use client";

import { Button } from "@/components/ui/button";

type delete_theme_confirm_props = {
  theme_label: string;
  question_count: number;
  is_uncategorized?: boolean;
  on_confirm: () => void;
  on_cancel: () => void;
};

/**
 * @param props - Theme label, question count, and confirm/cancel handlers
 */
export function DeleteThemeConfirm({
  theme_label,
  question_count,
  is_uncategorized = false,
  on_confirm,
  on_cancel,
}: delete_theme_confirm_props) {
  const question_phrase =
    question_count === 1
      ? "1 question"
      : `${question_count} questions`;

  const body =
    question_count > 0
      ? `This will permanently remove ${question_phrase} in this group.`
      : "This theme has no questions yet.";

  const title = is_uncategorized
    ? "Remove uncategorized group?"
    : `Delete “${theme_label}”?`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-theme-title"
    >
      <div className="w-full max-w-sm rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-lg">
        <h4
          id="delete-theme-title"
          className="text-sm font-semibold text-[#1f2937] mb-2"
        >
          {title}
        </h4>
        <p className="text-xs text-muted-foreground mb-4">{body}</p>
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="secondary"
            className="h-8 text-xs"
            onClick={on_cancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="h-8 text-xs bg-red-600 hover:bg-red-700 text-white"
            onClick={on_confirm}
          >
            {question_count > 0 ? "Delete theme & questions" : "Delete theme"}
          </Button>
        </div>
      </div>
    </div>
  );
}
