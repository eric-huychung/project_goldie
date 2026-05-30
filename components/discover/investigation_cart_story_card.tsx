/**
 * Editable story card in the investigation cart stories panel.
 */

"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";

import { DeleteStoryConfirm } from "@/components/discover/delete_story_confirm";
import { Button } from "@/components/ui/button";
import type { investigation_story } from "@/lib/types/discover";
import { cn } from "@/lib/utils";

type investigation_cart_story_card_props = {
  story: investigation_story;
  theme_label?: string | null;
  default_collapsed?: boolean;
  on_title_change: (title: string) => void;
  on_body_change: (body: string) => void;
  on_remove: () => void;
};

/**
 * @param props - Story data and edit/delete handlers
 */
export function InvestigationCartStoryCard({
  story,
  theme_label,
  default_collapsed = false,
  on_title_change,
  on_body_change,
  on_remove,
}: investigation_cart_story_card_props) {
  const [collapsed, set_collapsed] = useState(default_collapsed);
  const [confirm_delete, set_confirm_delete] = useState(false);

  return (
    <section className="border-l-2 border-amber-400 pl-3 rounded-r-lg">
      <div className="flex items-center gap-1.5 mb-2">
        <button
          type="button"
          onClick={() => set_collapsed((value) => !value)}
          className="p-0.5 text-muted-foreground hover:text-[#1f2937] shrink-0"
          aria-label={collapsed ? "Expand story" : "Collapse story"}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        <button
          type="button"
          onClick={() => set_collapsed((value) => !value)}
          className="flex items-center gap-2 flex-1 min-w-0 text-left"
        >
          <span className="text-sm font-medium text-[#1f2937] truncate">
            {story.title.trim() || "Untitled story"}
          </span>
        </button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-red-500 shrink-0"
          onClick={() => set_confirm_delete(true)}
          aria-label={`Delete story ${story.title}`}
          title="Delete story"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {confirm_delete ? (
        <DeleteStoryConfirm
          story_title={story.title.trim() || "Untitled story"}
          on_cancel={() => set_confirm_delete(false)}
          on_confirm={() => {
            on_remove();
            set_confirm_delete(false);
          }}
        />
      ) : null}

      {!collapsed ? (
        <div className="space-y-2 pb-3">
          {theme_label ? (
            <p className="text-xs text-muted-foreground">
              Linked theme:{" "}
              <span className="font-medium text-[#1f2937]">{theme_label}</span>
            </p>
          ) : null}
          <label className="block">
            <span className="text-xs text-muted-foreground mb-1 block">
              Story title
            </span>
            <input
              value={story.title}
              onChange={(event) => on_title_change(event.target.value)}
              className="w-full text-sm font-medium text-[#1f2937] rounded-md border border-[#e5e7eb] px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted-foreground mb-1 block">
              Story
            </span>
            <textarea
              value={story.body}
              onChange={(event) => on_body_change(event.target.value)}
              rows={5}
              className={cn(
                "w-full text-sm text-[#1f2937] rounded-md border border-[#e5e7eb] px-2 py-1.5 resize-y",
                "focus:outline-none focus:ring-2 focus:ring-amber-500/20",
              )}
            />
          </label>
        </div>
      ) : null}
    </section>
  );
}
