/**
 * Row normalization for vendor payment CSV exports (2022_table.csv, 2023_table.csv).
 */

export type vendor_payment_row = {
  bien: string;
  fy: number;
  fmonth: number;
  agy: number;
  agency: string;
  object_code: string;
  category: string;
  subobj: string;
  subcategory: string;
  vendor: string;
  amount: number;
  source_sheet: string;
};

/**
 * Trims spreadsheet padding from text cells.
 *
 * @param value - Raw cell value
 * @returns Trimmed string
 */
function trim_text(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

/**
 * Parses integer-like spreadsheet values.
 *
 * @param value - Raw cell value
 * @param field_name - Column name for error messages
 * @returns Parsed integer
 */
function parse_int(value: unknown, field_name: string): number {
  const text = trim_text(value);
  if (!text) {
    throw new Error(`Missing ${field_name}`);
  }

  const parsed = Number.parseInt(text, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid ${field_name}: ${text}`);
  }

  return parsed;
}

/**
 * Parses currency amounts from spreadsheet cells.
 *
 * @param value - Raw cell value
 * @returns Parsed amount
 */
function parse_amount(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }

  const text = trim_text(value).replace(/,/g, "");
  if (!text) {
    throw new Error("Missing Amount");
  }

  const parsed = Number.parseFloat(text);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid Amount: ${text}`);
  }

  return parsed;
}

/**
 * Converts one raw CSV row into a normalized vendor payment record.
 *
 * @param raw - Parsed CSV row (column headers from export)
 * @param source_sheet - Source label (e.g. "FY 2023")
 * @returns Normalized row, or null when the row is empty
 */
export function normalize_vendor_payment_row(
  raw: Record<string, unknown>,
  source_sheet: string,
): vendor_payment_row | null {
  const bien = trim_text(raw.Bien);
  const vendor = trim_text(raw.Vendor);

  if (!bien && !vendor) {
    return null;
  }

  return {
    bien,
    fy: parse_int(raw.FY, "FY"),
    fmonth: parse_int(raw.FMonth, "FMonth"),
    agy: parse_int(raw.Agy, "Agy"),
    agency: trim_text(raw.Agency),
    object_code: trim_text(raw.Object),
    category: trim_text(raw.Category),
    subobj: trim_text(raw.Subobj),
    subcategory: trim_text(raw.SubCategory),
    vendor,
    amount: parse_amount(raw.Amount),
    source_sheet,
  };
}

/**
 * Escapes one CSV field for Postgres COPY.
 *
 * @param value - Field value
 * @returns CSV-safe field
 */
export function to_csv_field(value: string | number): string {
  const text = String(value);

  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

/**
 * Serializes a normalized row as one CSV line for COPY.
 *
 * @param row - Normalized vendor payment row
 * @returns CSV line without trailing newline
 */
export function vendor_payment_row_to_csv(row: vendor_payment_row): string {
  return [
    row.bien,
    row.fy,
    row.fmonth,
    row.agy,
    row.agency,
    row.object_code,
    row.category,
    row.subobj,
    row.subcategory,
    row.vendor,
    row.amount.toFixed(2),
    row.source_sheet,
  ]
    .map(to_csv_field)
    .join(",");
}
