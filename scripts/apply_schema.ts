/**
 * Applies scripts/schema.sql and scripts/schema_audit.sql to the configured Postgres database.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { create_pg_client, load_project_env } from "./lib/load_env";

load_project_env();

const schema_files = ["schema.sql", "schema_audit.sql"];

/**
 * Runs dataset and audit DDL against Postgres.
 */
async function apply_schema(): Promise<void> {
  const client = create_pg_client();
  await client.connect();

  try {
    for (const filename of schema_files) {
      const schema_path = path.join(process.cwd(), "scripts", filename);
      const sql = readFileSync(schema_path, "utf8");
      await client.query(sql);
      console.log("Schema applied:", schema_path);
    }
  } finally {
    await client.end();
  }
}

apply_schema().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
