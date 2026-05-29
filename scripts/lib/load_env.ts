/**
 * Loads local env files for one-off scripts (schema apply, ETL import).
 */

import { config } from "dotenv";
import { existsSync } from "node:fs";
import path from "node:path";
import pg from "pg";

/**
 * Loads `.env.local` then `.env` from the project root when present.
 */
export function load_project_env(): void {
  const root = process.cwd();

  for (const filename of [".env.local", ".env"]) {
    const file_path = path.join(root, filename);
    if (existsSync(file_path)) {
      config({ path: file_path, override: false });
    }
  }
}

/**
 * Resolves the Postgres connection string used by scripts.
 *
 * @returns Direct Postgres URL (non-pooling preferred for bulk load)
 */
export function get_postgres_url(): string {
  const url =
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.POSTGRES_URL ??
    process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "Missing POSTGRES_URL_NON_POOLING, POSTGRES_URL, or DATABASE_URL in .env",
    );
  }

  return url;
}

/**
 * Strips sslmode from the URL so pg uses our explicit SSL options.
 *
 * @param connection_string - Postgres URL from env
 * @returns URL safe for Supabase bulk scripts on Node
 */
function strip_sslmode_param(connection_string: string): string {
  const url = new URL(connection_string);
  url.searchParams.delete("sslmode");
  return url.toString();
}

/**
 * Creates a Postgres client for local ETL scripts (Supabase SSL compatible).
 *
 * @returns pg Client — call connect() before queries
 */
export function create_pg_client(): pg.Client {
  return new pg.Client({
    connectionString: strip_sslmode_param(get_postgres_url()),
    ssl: { rejectUnauthorized: false },
  });
}
