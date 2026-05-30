/**
 * Fictional demo personas and static comment pins for the collaboration preview.
 * UI-only mock data — not persisted, not sent to any API, no real user identities.
 */

import type {
  dashboard_comment_author,
  dashboard_comment_pin,
} from "@/lib/types/dashboard_collaboration";

/** Demo notebook owner (fictional). */
export const NOTEBOOK_OWNER: dashboard_comment_author = {
  name: "Golda",
  role: "owner",
  initials: "G",
};

/** Demo professor reviewer (fictional). */
export const DEMO_PROFESSOR: dashboard_comment_author = {
  name: "Dr. Chen",
  role: "professor",
  initials: "C",
};

/** Demo peer reviewer (fictional). */
export const DEMO_PEER: dashboard_comment_author = {
  name: "Jordan",
  role: "peer",
  initials: "J",
};

export const DASHBOARD_COLLABORATION_PREVIEW_PINS: dashboard_comment_pin[] = [
  {
    id: "golda-story-draft",
    chart_id: "theme-story",
    pin_number: 1,
    author: NOTEBOOK_OWNER,
    position: { x_pct: 92, y_pct: 12 },
    text: "Draft opening for the class presentation — still deciding whether to lead with FY growth or the category split.",
  },
  {
    id: "chen-fy-spike",
    chart_id: "spend-by-fy",
    pin_number: 1,
    author: DEMO_PROFESSOR,
    position: { x_pct: 72, y_pct: 28 },
    text: "The FY 2022→2023 jump (~14%) is your hook. Can you break this down by agency?",
    replies: [
      {
        author: DEMO_PEER.name,
        text: "I can pull agency-level FY totals from the dataset if that helps.",
      },
    ],
  },
  {
    id: "jordan-vendor-concentration",
    chart_id: "top-vendors",
    pin_number: 1,
    author: DEMO_PEER,
    position: { x_pct: 18, y_pct: 22 },
    text: "Three vendors dominate the top of this list — worth calling out concentration risk?",
  },
  {
    id: "chen-category-split",
    chart_id: "spend-by-category",
    pin_number: 1,
    author: DEMO_PROFESSOR,
    position: { x_pct: 55, y_pct: 45 },
    text: "Most dollars are grants and client services — not regular goods. Make that explicit in your narrative.",
  },
];

/**
 * Returns mock comment pins for a dashboard chart or story block.
 *
 * @param chart_id - Chart spec id or `theme-story` for the header block
 * @returns Pins sorted by pin number
 */
export function get_comment_pins_for_chart(chart_id: string): dashboard_comment_pin[] {
  return DASHBOARD_COLLABORATION_PREVIEW_PINS.filter(
    (pin) => pin.chart_id === chart_id,
  ).sort((a, b) => a.pin_number - b.pin_number);
}
