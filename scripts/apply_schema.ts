/**
 * Applies scripts/schema.sql to the configured Supabase Postgres database.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { create_pg_client, load_project_env } from "./lib/load_env";

load_project_env();

const schema_path = path.join(process.cwd(), "scripts", "schema.sql");

/**
 * Runs the schema SQL file against Postgres.
 */
async function apply_schema(): Promise<void> {
  const sql = readFileSync(schema_path, "utf8");
  const client = create_pg_client();

  await client.connect();

  try {
    await client.query(sql);
    console.log("Schema applied:", schema_path);
  } finally {
    await client.end();
  }
}

apply_schema().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
