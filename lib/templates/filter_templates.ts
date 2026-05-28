/**
 * Pure filter helpers for the templates marketplace.
 */

import type { template_record } from "@/lib/types/template";

/**
 * Filters templates by search query and category pill.
 *
 * @param templates - Full template list
 * @param query - Search string (title/description)
 * @param category - Category value or "all"
 * @returns Filtered templates
 */
export function filter_templates(
  templates: template_record[],
  query: string,
  category: string,
): template_record[] {
  const normalized_query = query.trim().toLowerCase();

  return templates.filter((template) => {
    const matches_category = category === "all" || template.category === category;
    if (!matches_category) {
      return false;
    }

    if (!normalized_query) {
      return true;
    }

    return (
      template.title.toLowerCase().includes(normalized_query) ||
      template.description.toLowerCase().includes(normalized_query)
    );
  });
}
