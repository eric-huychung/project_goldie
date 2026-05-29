/**
 * Template marketplace types shared by mock data, UI, and future API.
 */

export type template_source = "system" | "community" | "user";

export type template_visibility = "public" | "private";

/** Set on private templates: yours vs shared with you. */
export type template_ownership = "owned" | "shared";

export type template_record = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon_key: string;
  color_class: string;
  source: template_source;
  visibility: template_visibility;
  creator_name: string;
  like_count: number;
  ownership?: template_ownership;
};

export type template_category = {
  label: string;
  value: string;
};

export type notebook_start =
  | { kind: "template"; template_id: string }
  | { kind: "blank" }
  | { kind: "prompt"; prompt: string };
