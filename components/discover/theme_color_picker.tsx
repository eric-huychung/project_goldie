/**
 * Minimal color picker — click dot to choose from preset swatches.
 */

"use client";

import { useEffect, useRef, useState } from "react";

import {
  INVESTIGATION_THEME_COLOR_ORDER,
  INVESTIGATION_THEME_COLOR_STYLES,
} from "@/lib/discover/investigation_theme_colors";
import type { investigation_theme_color_key } from "@/lib/types/discover";
import { cn } from "@/lib/utils";

type theme_color_picker_props = {
  color_key: investigation_theme_color_key;
  on_select: (color_key: investigation_theme_color_key) => void;
};

/**
 * @param props - Current color and selection handler
 */
export function ThemeColorPicker({
  color_key,
  on_select,
}: theme_color_picker_props) {
  const [open, set_open] = useState(false);
  const root_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handle_pointer_down = (event: MouseEvent) => {
      if (
        root_ref.current &&
        !root_ref.current.contains(event.target as Node)
      ) {
        set_open(false);
      }
    };

    document.addEventListener("mousedown", handle_pointer_down);
    return () => document.removeEventListener("mousedown", handle_pointer_down);
  }, [open]);

  const color_style = INVESTIGATION_THEME_COLOR_STYLES[color_key];

  return (
    <div ref={root_ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => set_open((value) => !value)}
        className={cn(
          "w-3.5 h-3.5 rounded-full hover:ring-2 hover:ring-offset-1 hover:ring-[#1f2937]/25",
          color_style.dot_class,
          open && "ring-2 ring-offset-1 ring-[#1f2937]/30",
        )}
        title="Choose color"
        aria-label="Choose theme color"
        aria-expanded={open}
      />

      {open ? (
        <div
          className="absolute left-0 top-full z-20 mt-1.5 p-2 rounded-lg border border-[#e5e7eb] bg-white shadow-md flex gap-1.5"
          role="listbox"
          aria-label="Theme colors"
        >
          {INVESTIGATION_THEME_COLOR_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              role="option"
              aria-selected={key === color_key}
              title={key}
              onClick={() => {
                on_select(key);
                set_open(false);
              }}
              className={cn(
                "w-5 h-5 rounded-full border-2 transition-transform hover:scale-110",
                INVESTIGATION_THEME_COLOR_STYLES[key].dot_class,
                key === color_key
                  ? "border-[#1f2937]"
                  : "border-transparent",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
