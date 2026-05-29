/**
 * System "Uncategorized" theme for the investigation cart (not in themes list).
 */

import type {
  investigation_theme,
  investigation_theme_color_key,
} from "@/lib/types/discover";

export const UNCATEGORIZED_THEME_ID = "__uncategorized__";

/**
 * @param color_key - User-selected color for the uncategorized group
 * @returns Theme record used for cart grouping and styling
 */
export function build_uncategorized_theme(
  color_key: investigation_theme_color_key,
): investigation_theme {
  return {
    id: UNCATEGORIZED_THEME_ID,
    name: "Uncategorized",
    color_key,
  };
}

/**
 * Maps drop target theme id to stored question theme_id.
 *
 * @param theme_id - Group theme id from drag-and-drop
 * @returns null for uncategorized, otherwise the theme id
 */
export function resolve_question_theme_id(
  theme_id: string | null,
): string | null {
  if (theme_id === UNCATEGORIZED_THEME_ID) {
    return null;
  }
  return theme_id;
}
