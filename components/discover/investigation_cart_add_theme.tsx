/**
 * Inline form to add a new investigation theme with a preset color.
 */

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  INVESTIGATION_THEME_COLOR_ORDER,
  INVESTIGATION_THEME_COLOR_STYLES,
} from "@/lib/discover/investigation_theme_colors";
import type { investigation_theme_color_key } from "@/lib/types/discover";
import { cn } from "@/lib/utils";

type investigation_cart_add_theme_props = {
  on_add: (name: string, color_key: investigation_theme_color_key) => void;
};

/**
 * @param props - Callback when user creates a theme
 */
export function InvestigationCartAddTheme({
  on_add,
}: investigation_cart_add_theme_props) {
  const [expanded, set_expanded] = useState(false);
  const [name, set_name] = useState("");
  const [color_key, set_color_key] =
    useState<investigation_theme_color_key>("amber");

  const handle_submit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    on_add(trimmed, color_key);
    set_name("");
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
        + Theme
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-[#e5e7eb] p-2.5 space-y-2 bg-[#f8f9fa]/50">
      <Input
        value={name}
        onChange={(e) => set_name(e.target.value)}
        placeholder="Theme name"
        className="h-8 text-xs"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handle_submit();
          }
        }}
      />
      <div className="flex items-center gap-1.5">
        {INVESTIGATION_THEME_COLOR_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            title={key}
            onClick={() => set_color_key(key)}
            className={cn(
              "w-5 h-5 rounded-full border-2 transition-transform",
              INVESTIGATION_THEME_COLOR_STYLES[key].dot_class,
              color_key === key
                ? "border-[#1f2937] scale-110"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          className="flex-1 h-8 text-xs bg-[#0369a1] hover:bg-[#0c4a6e] text-white"
          onClick={handle_submit}
          disabled={!name.trim()}
        >
          Add
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="h-8 text-xs"
          onClick={() => {
            set_expanded(false);
            set_name("");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
