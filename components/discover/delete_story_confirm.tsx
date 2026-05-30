/**
 * Confirmation dialog before deleting a story from the investigation cart.
 */

"use client";

import { Button } from "@/components/ui/button";

type delete_story_confirm_props = {
  story_title: string;
  on_confirm: () => void;
  on_cancel: () => void;
};

/**
 * @param props - Story title and confirm/cancel handlers
 */
export function DeleteStoryConfirm({
  story_title,
  on_confirm,
  on_cancel,
}: delete_story_confirm_props) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-story-title"
    >
      <div className="w-full max-w-sm rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-lg">
        <h4
          id="delete-story-title"
          className="text-sm font-semibold text-[#1f2937] mb-2"
        >
          Delete “{story_title}”?
        </h4>
        <p className="text-xs text-muted-foreground mb-4">
          This will remove the story from your investigation cart.
        </p>
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
            Delete story
          </Button>
        </div>
      </div>
    </div>
  );
}
