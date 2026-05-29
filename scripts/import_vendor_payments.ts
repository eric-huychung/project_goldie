/**
 * One-time ETL: loads vendor payment CSVs from data/ into Supabase Postgres.
 *
 * Usage:
 *   npm run db:schema
 *   npm run import:vendor-payments
 *   npm run import:vendor-payments -- --replace
 */

import { createReadStream } from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { parse } from "csv-parse";
import pg from "pg";
import { from as copy_from } from "pg-copy-streams";

import { create_pg_client, load_project_env } from "./lib/load_env";
import {
  normalize_vendor_payment_row,
  vendor_payment_row_to_csv,
} from "./lib/normalize_vendor_payment_row";

load_project_env();

const data_dir = path.join(process.cwd(), "data");

const csv_sources = [
  { file: "2022_table.csv", source_sheet: "FY 2022" },
  { file: "2023_table.csv", source_sheet: "FY 2023" },
] as const;

const copy_columns = [
  "bien",
  "fy",
  "fmonth",
  "agy",
  "agency",
  "object_code",
  "category",
  "subobj",
  "subcategory",
  "vendor",
  "amount",
  "source_sheet",
].join(", ");

/**
 * Streams normalized CSV lines from each source file for Postgres COPY.
 */
async function* build_csv_lines(): AsyncGenerator<string> {
  for (const { file, source_sheet } of csv_sources) {
    const file_path = path.join(data_dir, file);
    let row_count = 0;

    const parser = createReadStream(file_path).pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true,
      }),
    );

    for await (const raw_row of parser) {
      row_count++;
      const row = normalize_vendor_payment_row(
        raw_row as Record<string, unknown>,
        source_sheet,
      );

      if (!row) {
        continue;
      }

      yield `${vendor_payment_row_to_csv(row)}\n`;
    }

    console.log(
      `Read ${source_sheet}: ${row_count.toLocaleString()} rows from ${file}`,
    );
  }
}

/**
 * Loads all vendor payment rows into Postgres using COPY.
 *
 * @param client - Connected Postgres client
 */
async function copy_vendor_payments(client: pg.Client): Promise<void> {
  const copy_sql = `
    COPY vendor_payments (${copy_columns})
    FROM STDIN
    WITH (FORMAT csv)
  `;

  const db_stream = client.query(copy_from(copy_sql));
  const csv_stream = Readable.from(build_csv_lines());

  await pipeline(csv_stream, db_stream);
}

/**
 * Prints row counts after import.
 *
 * @param client - Connected Postgres client
 */
async function print_summary(client: pg.Client): Promise<void> {
  const result = await client.query<{
    row_count: string;
    fy_min: number;
    fy_max: number;
    total_amount: string;
    last_imported_at: string;
  }>("SELECT * FROM vendor_payments_dataset_summary");

  const summary = result.rows[0];
  console.log("Import complete:");
  console.log(`  rows: ${Number(summary.row_count).toLocaleString()}`);
  console.log(`  fiscal years: ${summary.fy_min}–${summary.fy_max}`);
  console.log(`  total amount: ${summary.total_amount}`);
  console.log(`  imported at: ${summary.last_imported_at}`);
}

/**
 * Entry point for the vendor payments import script.
 */
async function main(): Promise<void> {
  const replace = process.argv.includes("--replace");
  const client = create_pg_client();

  await client.connect();

  try {
    if (replace) {
      console.log("Truncating vendor_payments...");
      await client.query("TRUNCATE vendor_payments RESTART IDENTITY");
    }

    const existing = await client.query<{ count: string }>(
      "SELECT count(*)::text AS count FROM vendor_payments",
    );
    const existing_count = Number(existing.rows[0]?.count ?? 0);

    if (existing_count > 0 && !replace) {
      throw new Error(
        `vendor_payments already has ${existing_count.toLocaleString()} rows. Re-run with --replace to reload.`,
      );
    }

    console.log("Starting COPY import from CSV...");
    const started_at = Date.now();
    await copy_vendor_payments(client);
    await print_summary(client);
    console.log(`Elapsed: ${((Date.now() - started_at) / 1000).toFixed(1)}s`);
  } finally {
    await client.end();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
