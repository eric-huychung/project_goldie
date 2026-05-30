/**
 * Curated vendor payments analysis — single source for Discover UI and LLM context.
 * Raw query output: docs/insights.md. Update both when re-running analysis.
 */

import type {
  discover_key_question_theme,
  discover_quick_insight,
} from "@/lib/types/discover";

export type vendor_payments_faq_item = {
  question: string;
  answer: string;
};

export type vendor_payments_fy_spend = {
  fy: number;
  total: number;
  payments: number;
};

export type vendor_payments_named_total = {
  name: string;
  total: number;
};

export type vendor_payments_monthly_spend = {
  fy: number;
  fmonth: number;
  total: number;
};

export type vendor_payments_investigation_theme = {
  id: string;
  title: string;
  description: string;
  story: string;
  questions: { id: string; text: string }[];
};

/** Query results from docs/insights.md (May 2026). */
export const VENDOR_PAYMENTS_ANALYSIS = {
  overview: {
    rows: 935_853,
    vendors: 97_519,
    agencies: 102,
    total_spend: 63_247_181_911.03,
  },
  spend_by_fy: [
    { fy: 2022, total: 29_535_369_459.65, payments: 451_029 },
    { fy: 2023, total: 33_711_812_451.38, payments: 484_824 },
  ] satisfies vendor_payments_fy_spend[],
  top_vendors: [
    { name: "MOLINA HEALTHCARE OF WASHINGTON", total: 9_806_781_735.15 },
    { name: "UNITED HEALTH CARE OF WASHINGTON", total: 2_765_346_881.65 },
    { name: "AMERIGROUP WASHINGTON INC", total: 2_741_138_066.6 },
    { name: "CONSUMER DIRECT CARE NETWORK WAS", total: 2_534_449_682.06 },
    { name: "COMMUNITY HEALTH PLAN OF WASHING", total: 2_505_301_809.62 },
    { name: "COORDINATED CARE OF WASHINGTON I", total: 2_211_444_869.34 },
    { name: "PUBLIC PARTNERSHIPS LLC", total: 1_453_189_092.52 },
    { name: "US BANK PURCHASING CARD PROGRAM", total: 477_720_255.0 },
    { name: "GEOCKO INC", total: 471_073_966.9 },
    { name: "CLARK CONSTRUCTION LLC", total: 456_668_738.08 },
  ] satisfies vendor_payments_named_total[],
  top_agencies: [
    { name: "Health Care Authority", total: 28_071_754_707.3 },
    { name: "Social and Health Services", total: 13_466_617_580.39 },
    { name: "Transportation", total: 4_065_040_672.21 },
    { name: "Commerce", total: 3_258_742_444.98 },
    { name: "Children, Youth, and Families", total: 2_639_976_344.59 },
    { name: "Health", total: 2_369_463_504.56 },
    { name: "Public Schools", total: 1_626_764_374.45 },
    { name: "Military Department", total: 915_126_832.84 },
    { name: "Ecology", total: 906_874_138.4 },
    { name: "Corrections", total: 855_107_466.82 },
  ] satisfies vendor_payments_named_total[],
  spend_by_category: [
    { name: "Grants, Benefits & Client Services", total: 49_911_140_962.16 },
    { name: "Goods and Services", total: 7_355_277_513.85 },
    { name: "Capital Outlays", total: 3_690_157_617.05 },
    { name: "Personal Service Contracts", total: 2_030_497_821.81 },
    { name: "Travel", total: 153_675_241.76 },
    { name: "Debt Service", total: 46_643_523.92 },
    { name: "Cost Of Goods Sold", total: 23_464_479.61 },
    { name: "Intra-Agency Reimbursements", total: 20_954_748.68 },
    { name: "Interagency Reimbursements", total: 15_370_002.19 },
  ] satisfies vendor_payments_named_total[],
  monthly_spend: [
    { fy: 2022, fmonth: 1, total: 3_446_473_054.66 },
    { fy: 2022, fmonth: 2, total: 1_511_666_571.93 },
    { fy: 2022, fmonth: 3, total: 3_168_150_366.09 },
    { fy: 2022, fmonth: 4, total: 2_327_239_782.44 },
    { fy: 2022, fmonth: 5, total: 1_589_116_217.55 },
    { fy: 2022, fmonth: 6, total: 3_155_895_567.73 },
    { fy: 2022, fmonth: 7, total: 2_500_740_123.95 },
    { fy: 2022, fmonth: 8, total: 2_379_785_813.64 },
    { fy: 2022, fmonth: 9, total: 2_577_922_072.74 },
    { fy: 2022, fmonth: 10, total: 2_399_425_020.01 },
    { fy: 2022, fmonth: 11, total: 2_468_839_253.93 },
    { fy: 2022, fmonth: 12, total: 2_010_115_614.98 },
    { fy: 2023, fmonth: 13, total: 3_431_543_877.7 },
    { fy: 2023, fmonth: 14, total: 1_916_108_451.93 },
    { fy: 2023, fmonth: 15, total: 3_589_221_861.53 },
    { fy: 2023, fmonth: 16, total: 2_643_727_476.89 },
    { fy: 2023, fmonth: 17, total: 1_901_393_760.1 },
    { fy: 2023, fmonth: 18, total: 3_655_294_602.3 },
    { fy: 2023, fmonth: 19, total: 3_028_810_436.86 },
    { fy: 2023, fmonth: 20, total: 2_497_958_921.13 },
    { fy: 2023, fmonth: 21, total: 2_807_053_314.59 },
    { fy: 2023, fmonth: 22, total: 2_524_977_449.51 },
    { fy: 2023, fmonth: 23, total: 1_978_473_812.75 },
    { fy: 2023, fmonth: 24, total: 3_737_248_486.09 },
  ] satisfies vendor_payments_monthly_spend[],
} as const;

export const VENDOR_PAYMENTS_INVESTIGATION_THEME: vendor_payments_investigation_theme =
  {
    id: "where-money-goes",
    title: "Where Does the Money Go?",
    description:
      "Most vendor payments flow to a few health agencies and health vendors.",
    story:
      "Washington sends out a lot of vendor payments, but most of the money goes to the same place: health and social programs. Two agencies and a handful of health vendors — led by Molina — account for a huge share. The dataset looks big, but the story is simple: most dollars flow to a small group.",
    questions: [
      {
        id: "where-money-goes-q1",
        text: "Who are the top vendors, and how much of total spend do they get?",
      },
      {
        id: "where-money-goes-q2",
        text: "Which agencies spend the most?",
      },
      {
        id: "where-money-goes-q3",
        text: "Did the biggest agencies spend more in 2023 than in 2022?",
      },
    ],
  };

/** Default story suggestion for Communicate (capstone narrative). */
export const VENDOR_PAYMENTS_STORY_SUGGESTION = {
  id: "story-where-money-goes",
  title: VENDOR_PAYMENTS_INVESTIGATION_THEME.title,
  body: VENDOR_PAYMENTS_INVESTIGATION_THEME.story,
  theme_id: VENDOR_PAYMENTS_INVESTIGATION_THEME.id,
  theme_name: VENDOR_PAYMENTS_INVESTIGATION_THEME.title,
} as const;

export const DISCOVER_QUICK_INSIGHTS: discover_quick_insight[] = [
  {
    id: "1",
    fact: "~79% of spend is grants and client services — not regular goods or contracts.",
    suggested_question:
      "Which agencies and vendors account for most grants and client services spend?",
  },
  {
    id: "2",
    fact: "Health Care Authority spends the most (~$28B). With Social and Health Services, the top two agencies are about two-thirds of all spend.",
    suggested_question: "Which agencies spend the most?",
  },
  {
    id: "3",
    fact: "Molina Healthcare is the top vendor (~$9.8B).",
    suggested_question:
      "Who are the top vendors, and how much of total spend do they get?",
  },
  {
    id: "4",
    fact: "The top 10 vendors get about half of all spend, out of ~97K vendors total.",
    suggested_question:
      "Did the biggest vendors receive more in 2023 than in 2022?",
  },
];

export const DISCOVER_KEY_QUESTION_THEMES: discover_key_question_theme[] = [
  {
    id: VENDOR_PAYMENTS_INVESTIGATION_THEME.id,
    title: VENDOR_PAYMENTS_INVESTIGATION_THEME.title,
    description: VENDOR_PAYMENTS_INVESTIGATION_THEME.description,
    questions: VENDOR_PAYMENTS_INVESTIGATION_THEME.questions,
  },
];

export const VENDOR_PAYMENTS_CHAT_QUICK_INSIGHTS: string[] = [
  "Total vendor spend is ~$63.2B across FY 2022–2023 (~936K payment lines, ~97.5K vendors, 102 agencies).",
  "~79% of spend is Grants, Benefits & Client Services ($49.9B).",
  "Health Care Authority is the top agency (~$28.1B, ~44% of total); with Social and Health Services (~$13.5B), the top two agencies are ~two-thirds of spend.",
  "Molina Healthcare is the top vendor (~$9.8B, ~15.5% of total). Seven of the top 10 vendors are managed-care organizations.",
  "Top 10 vendors total ~$35.2B (~56% of all spend).",
  "FY 2023 spend (~$33.7B) was ~14% higher than FY 2022 (~$29.5B); payment count rose ~7.5%.",
];

export const VENDOR_PAYMENTS_CHAT_FAQS: vendor_payments_faq_item[] = [
  {
    question: "What years does this dataset cover?",
    answer: "Fiscal years 2022 and 2023.",
  },
  {
    question: "Who is the top vendor?",
    answer:
      "Molina Healthcare of Washington, with about $9.8B in total payments (~15.5% of all spend).",
  },
  {
    question: "Which agency spends the most?",
    answer:
      "Health Care Authority, with about $28.1B (~44% of total vendor payments).",
  },
  {
    question: "Where does most of the money go by category?",
    answer:
      "Grants, Benefits & Client Services — about $49.9B, roughly 79% of total spend.",
  },
  {
    question: "How much did spend grow year over year?",
    answer:
      "Total spend rose from about $29.5B in FY 2022 to $33.7B in FY 2023 (~14% increase).",
  },
];

function format_currency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }

  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }

  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function format_named_totals(
  label: string,
  rows: readonly vendor_payments_named_total[],
  limit = 10,
): string[] {
  return [
    label,
    ...rows.slice(0, limit).map(
      (row, index) =>
        `${index + 1}. ${row.name}: ${format_currency(row.total)}`,
    ),
  ];
}

/**
 * @returns Compact analysis block for LLM system prompts (chat, question assist)
 */
export function format_vendor_payments_analysis_for_prompt(): string {
  const { overview, spend_by_fy, top_vendors, top_agencies, spend_by_category } =
    VENDOR_PAYMENTS_ANALYSIS;
  const theme = VENDOR_PAYMENTS_INVESTIGATION_THEME;

  const sections = [
    "Dataset analysis (from SQL profiling — use these figures, do not invent):",
    "",
    "Overview:",
    `- Rows: ${overview.rows.toLocaleString()}`,
    `- Unique vendors: ${overview.vendors.toLocaleString()}`,
    `- Agencies: ${overview.agencies}`,
    `- Total spend (FY22–23): ${format_currency(overview.total_spend)}`,
    "",
    "Spend by fiscal year:",
    ...spend_by_fy.map(
      (row) =>
        `- FY ${row.fy}: ${format_currency(row.total)} (${row.payments.toLocaleString()} payments)`,
    ),
    "",
    ...format_named_totals("Top vendors by spend:", top_vendors),
    "",
    ...format_named_totals("Top agencies by spend:", top_agencies),
    "",
    ...format_named_totals("Spend by category:", spend_by_category),
    "",
    `Capstone theme: ${theme.title}`,
    theme.description,
    `Story angle: ${theme.story}`,
    "Key questions:",
    ...theme.questions.map((q) => `- ${q.text}`),
    "",
    "Quick insights:",
    ...VENDOR_PAYMENTS_CHAT_QUICK_INSIGHTS.map((line) => `- ${line}`),
    "",
    "FAQs:",
    ...VENDOR_PAYMENTS_CHAT_FAQS.flatMap((item) => [
      `Q: ${item.question}`,
      `A: ${item.answer}`,
    ]),
  ];

  return sections.join("\n");
}
