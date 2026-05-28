/**
 * Splits filtered templates into public and private marketplace sections.
 */

import type { template_record } from "@/lib/types/template";

export type template_sections = {
  public_templates: template_record[];
  private_templates: template_record[];
};

/**
 * @param templates - Filtered template list
 * @returns Public and private buckets for marketplace layout
 */
export function split_templates_by_visibility(
  templates: template_record[],
): template_sections {
  return {
    public_templates: templates.filter((t) => t.visibility === "public"),
    private_templates: templates.filter((t) => t.visibility === "private"),
  };
}
