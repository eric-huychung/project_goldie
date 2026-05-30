/**
 * Curated vendor payments insights and FAQs for the Communicate chat system prompt.
 * Derived from lib/datasets/vendor_payments_analysis.ts — see docs/sample_data_reference.md.
 */

import {
  VENDOR_PAYMENTS_CHAT_FAQS,
  VENDOR_PAYMENTS_CHAT_QUICK_INSIGHTS,
  type vendor_payments_faq_item,
} from "@/lib/datasets/vendor_payments_analysis";

export type { vendor_payments_faq_item };

export type vendor_payments_chat_context = {
  quick_insights: string[];
  frequently_asked: vendor_payments_faq_item[];
};

/** Populated from curated SQL analysis (see docs/sample_data_reference.md). */
export const VENDOR_PAYMENTS_CHAT_CONTEXT: vendor_payments_chat_context = {
  quick_insights: VENDOR_PAYMENTS_CHAT_QUICK_INSIGHTS,
  frequently_asked: VENDOR_PAYMENTS_CHAT_FAQS,
};

/**
 * @returns Prompt block for insights and FAQs, or empty string if unset
 */
export function format_vendor_payments_chat_context_for_prompt(): string {
  const { quick_insights, frequently_asked } = VENDOR_PAYMENTS_CHAT_CONTEXT;

  if (quick_insights.length === 0 && frequently_asked.length === 0) {
    return "";
  }

  const sections: string[] = [];

  if (quick_insights.length > 0) {
    sections.push(
      "Quick insights (from dataset analysis):",
      ...quick_insights.map((line) => `- ${line}`),
    );
  }

  if (frequently_asked.length > 0) {
    sections.push(
      "",
      "Frequently asked questions:",
      ...frequently_asked.flatMap((item) => [
        `Q: ${item.question}`,
        `A: ${item.answer}`,
        "",
      ]),
    );
  }

  return sections.join("\n").trim();
}
