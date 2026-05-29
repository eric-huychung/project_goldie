/**
 * Mock key questions for the Discover tab (template-tuned starting points).
 */

import type { discover_key_question_theme } from "@/lib/types/discover";

export const MOCK_KEY_QUESTION_THEMES: discover_key_question_theme[] = [
  {
    id: "anomalies",
    title: "Anomalies in Multi-Year Contract Cycles",
    description:
      "Analyze contract renewal patterns and identify vendors with unusual payment frequency changes across fiscal years.",
    questions: [
      {
        id: "anomalies-q1",
        text: "Which vendors show significant variance in payment amounts year-over-year?",
      },
      {
        id: "anomalies-q2",
        text: "Are there contracts with unusual renewal timing patterns?",
      },
    ],
  },
  {
    id: "quarterly",
    title: "Quarterly Department Spending Spikes",
    description:
      "Track seasonal spending patterns across departments to identify budget utilization trends and end-of-quarter spending behavior.",
    questions: [
      {
        id: "quarterly-q1",
        text: "Which departments exhibit the most pronounced Q4 spending increases?",
      },
      {
        id: "quarterly-q2",
        text: "Is there correlation between department size and spending volatility?",
      },
    ],
  },
  {
    id: "concentration",
    title: "Vendor Concentration Risk Analysis",
    description:
      "Evaluate dependency on key vendors and identify potential procurement risks from over-concentration.",
    questions: [
      {
        id: "concentration-q1",
        text: "What percentage of total spend goes to the top 10 vendors?",
      },
      {
        id: "concentration-q2",
        text: "Are there single-source dependencies for critical services?",
      },
    ],
  },
  {
    id: "timing",
    title: "Payment Timing Efficiency",
    description:
      "Analyze payment processing times and identify opportunities for early payment discounts or late payment penalties.",
    questions: [
      {
        id: "timing-q1",
        text: "What is the average time between invoice receipt and payment?",
      },
      {
        id: "timing-q2",
        text: "Which vendors offer early payment discounts that are being missed?",
      },
    ],
  },
  {
    id: "duplicates",
    title: "Duplicate Payment Detection",
    description:
      "Identify potential duplicate payments or invoices that may indicate process inefficiencies or fraud risk.",
    questions: [
      {
        id: "duplicates-q1",
        text: "Are there multiple payments with identical amounts to the same vendor within short timeframes?",
      },
      {
        id: "duplicates-q2",
        text: "Which invoice numbers appear more than once in the system?",
      },
    ],
  },
];
