/**
 * Inline form to add a custom story in the investigation cart.
 */

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type investigation_cart_add_story_props = {
  on_add: (title: string, body: string) => void;
};

/**
 * @param props - Callback when user creates a story
 */
export function InvestigationCartAddStory({
  on_add,
}: investigation_cart_add_story_props) {
  const [expanded, set_expanded] = useState(false);
  const [title, set_title] = useState("");
  const [body, set_body] = useState("");

  const handle_submit = () => {
    const trimmed_title = title.trim();
    if (!trimmed_title) {
      return;
    }

    on_add(trimmed_title, body.trim());
    set_title("");
    set_body("");
    set_expanded(false);
  };

  if (!expanded) {
    return (
      <Button
        type="button"
        variant="secondary"
        className="w-full h-8 text-xs border border-dashed border-[#e5e7eb] bg-transparent"
        onClick={() => set_expanded(true)}
      >
        + Story
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-[#e5e7eb] p-2.5 space-y-2 bg-[#f8f9fa]/50">
      <Input
        value={title}
        onChange={(event) => set_title(event.target.value)}
        placeholder="Story title"
        className="h-8 text-xs"
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handle_submit();
          }
        }}
      />
      <textarea
        value={body}
        onChange={(event) => set_body(event.target.value)}
        placeholder="Write your story… (optional — you can edit after adding)"
        rows={3}
        className="w-full text-xs rounded-md border border-[#e5e7eb] px-2 py-1.5 resize-none text-[#1f2937] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/20"
      />
      <div className="flex gap-2">
        <Button
          type="button"
          className="flex-1 h-8 text-xs bg-[#0369a1] hover:bg-[#0c4a6e] text-white"
          onClick={handle_submit}
          disabled={!title.trim()}
        >
          Add
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="h-8 text-xs"
          onClick={() => {
            set_expanded(false);
            set_title("");
            set_body("");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
