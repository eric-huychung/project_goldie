/**
 * Add / added control for a story suggestion on Communicate.
 */

"use client";

import { Check, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { use_investigation_cart } from "@/components/workspace/investigation_cart_provider";

type add_story_button_props = {
  story_id: string;
  title: string;
  body: string;
  theme_id?: string;
  theme_name?: string;
};

/**
 * @param props - Story id, title, body, and optional linked theme
 */
export function AddStoryButton({
  story_id,
  title,
  body,
  theme_id,
  theme_name,
}: add_story_button_props) {
  const { is_story_added, add_story, set_cart_panel, set_cart_open } =
    use_investigation_cart();

  const is_added = is_story_added(story_id);

  if (is_added) {
    return (
      <Button
        variant="ghost"
        className="h-7 text-xs text-amber-600 hover:text-amber-700 px-2 w-auto"
        onClick={() => {
          set_cart_panel("stories");
          set_cart_open(true);
        }}
      >
        <Check className="w-3 h-3 mr-1" />
        Added · Edit in cart
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className="h-7 text-xs text-muted-foreground hover:text-amber-600 px-2 w-auto"
      onClick={() =>
        add_story(story_id, title, body, {
          theme_id: theme_id ?? null,
          theme_name,
        })
      }
    >
      <Plus className="w-3 h-3 mr-1" />
      Add
    </Button>
  );
}
