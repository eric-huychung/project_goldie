/**
 * Types for mock dashboard collaboration pins (Phase 4e preview).
 * Used for static UI only — no persistence or network calls.
 */

export type dashboard_comment_author_role = "owner" | "professor" | "peer";

export type dashboard_comment_author = {
  name: string;
  role: dashboard_comment_author_role;
  initials: string;
};

export type dashboard_comment_reply = {
  author: string;
  text: string;
};

export type dashboard_comment_pin = {
  id: string;
  chart_id: string;
  pin_number: number;
  author: dashboard_comment_author;
  position: { x_pct: number; y_pct: number };
  text: string;
  replies?: dashboard_comment_reply[];
};
