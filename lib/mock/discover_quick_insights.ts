/**
 * Mock quick insights for the Discover tab (replace with profiling / RAG later).
 */

import type { discover_quick_insight } from "@/lib/types/discover";

export const MOCK_QUICK_INSIGHTS: discover_quick_insight[] = [
  {
    id: "1",
    fact: "Top 10 vendors account for roughly 62% of total payment volume.",
    suggested_question:
      "What percentage of total spend goes to the top 10 vendors, and is concentration increasing year over year?",
  },
  {
    id: "2",
    fact: "Q4 payments run about 1.4× the average of Q1–Q3 across fiscal years.",
    suggested_question:
      "Which departments show the most pronounced end-of-quarter spending spikes?",
  },
  {
    id: "3",
    fact: "Over 2,800 unique vendors appear in the dataset with a long tail of small payees.",
    suggested_question:
      "Are there single-source dependencies among vendors with the highest total spend?",
  },
  {
    id: "4",
    fact: "Payment amounts span several orders of magnitude, with a small set of very large outliers.",
    suggested_question:
      "Which vendors show significant variance in payment amounts year over year?",
  },
];
