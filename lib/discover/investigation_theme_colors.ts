/**
 * Preset colors for investigation cart themes (dot + left border).
 */

import type { investigation_theme_color_key } from "@/lib/types/discover";

export type investigation_theme_color_style = {
  dot_class: string;
  border_class: string;
};

export const INVESTIGATION_THEME_COLOR_ORDER: investigation_theme_color_key[] =
  ["amber", "blue", "emerald", "violet", "rose", "slate"];

export const INVESTIGATION_THEME_COLOR_STYLES: Record<
  investigation_theme_color_key,
  investigation_theme_color_style
> = {
  amber: {
    dot_class: "bg-amber-500",
    border_class: "border-l-amber-400",
  },
  blue: {
    dot_class: "bg-blue-500",
    border_class: "border-l-blue-400",
  },
  emerald: {
    dot_class: "bg-emerald-500",
    border_class: "border-l-emerald-400",
  },
  violet: {
    dot_class: "bg-violet-500",
    border_class: "border-l-violet-400",
  },
  rose: {
    dot_class: "bg-rose-500",
    border_class: "border-l-rose-400",
  },
  slate: {
    dot_class: "bg-slate-400",
    border_class: "border-l-slate-300",
  },
};

/**
 * Picks a color key for a new theme based on how many themes already exist.
 *
 * @param theme_count - Current number of user/discover themes
 * @returns Next color in the rotation
 */
export function pick_theme_color_key(
  theme_count: number,
): investigation_theme_color_key {
  return INVESTIGATION_THEME_COLOR_ORDER[
    theme_count % INVESTIGATION_THEME_COLOR_ORDER.length
  ];
}

/**
 * Returns the next color in the preset rotation (for click-to-cycle UI).
 *
 * @param current - Active color key
 * @returns Next color key
 */
export function next_theme_color_key(
  current: investigation_theme_color_key,
): investigation_theme_color_key {
  const index = INVESTIGATION_THEME_COLOR_ORDER.indexOf(current);
  const next_index =
    index < 0 ? 0 : (index + 1) % INVESTIGATION_THEME_COLOR_ORDER.length;
  return INVESTIGATION_THEME_COLOR_ORDER[next_index];
}
