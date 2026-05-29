/**
 * Groups tracked questions by theme for the investigation cart UI.
 */

import { build_uncategorized_theme } from "@/lib/discover/uncategorized_theme";
import type {
  investigation_theme,
  investigation_theme_color_key,
  tracked_question,
} from "@/lib/types/discover";

export type cart_question_group = {
  key: string;
  label: string;
  theme: investigation_theme;
  questions: tracked_question[];
};

/**
 * Builds ordered groups: all themes (including empty), then uncategorized when needed.
 *
 * @param themes - User/discover themes in the cart
 * @param questions - All tracked questions
 * @param uncategorized_color_key - Color for the system uncategorized group
 * @param show_uncategorized_group - When false, uncategorized bucket is hidden (questions stay)
 * @returns Theme groups in creation order plus an uncategorized drop zone when relevant
 */
export function group_cart_questions(
  themes: investigation_theme[],
  questions: tracked_question[],
  uncategorized_color_key: investigation_theme_color_key,
  show_uncategorized_group: boolean,
): cart_question_group[] {
  const groups: cart_question_group[] = themes.map((theme) => ({
    key: theme.id,
    label: theme.name,
    theme,
    questions: questions.filter((q) => q.theme_id === theme.id),
  }));

  const uncategorized = questions.filter((q) => q.theme_id === null);

  if (
    show_uncategorized_group &&
    (uncategorized.length > 0 || (themes.length > 0 && questions.length > 0))
  ) {
    const uncategorized_theme = build_uncategorized_theme(
      uncategorized_color_key,
    );
    groups.push({
      key: uncategorized_theme.id,
      label: uncategorized_theme.name,
      theme: uncategorized_theme,
      questions: uncategorized,
    });
  }

  return groups;
}
