/**
 * Discover workspace types — questions, insights, visualizations, and investigation cart.
 */

export type tracked_question_status = "todo" | "in-progress" | "done";

export type investigation_theme_color_key =
  | "amber"
  | "blue"
  | "emerald"
  | "violet"
  | "rose"
  | "slate";

export type investigation_theme = {
  id: string;
  name: string;
  color_key: investigation_theme_color_key;
};

export type tracked_question = {
  id: string;
  text: string;
  status: tracked_question_status;
  notes: string;
  /** null = uncategorized group in the cart */
  theme_id: string | null;
};

export type investigation_story = {
  id: string;
  title: string;
  body: string;
  /** Optional link to an investigation theme */
  theme_id: string | null;
};

export type story_suggestion = {
  id: string;
  title: string;
  body: string;
  theme_id?: string | null;
  theme_name?: string;
};

export type track_question_options = {
  theme_id?: string | null;
  theme_name?: string;
};

export type add_story_options = {
  theme_id?: string | null;
  theme_name?: string;
};

export type investigation_cart_panel = "themes" | "stories";

export type discover_question_item = {
  id: string;
  text: string;
};

export type discover_key_question_theme = {
  id: string;
  title: string;
  description: string;
  questions: discover_question_item[];
};

export type discover_quick_insight = {
  id: string;
  fact: string;
  suggested_question: string;
};

export type discover_suggested_visualization = {
  id: string;
  title: string;
  question: string;
  chart_type: "line" | "bar";
  x_axis: string;
  y_axis: string;
};
