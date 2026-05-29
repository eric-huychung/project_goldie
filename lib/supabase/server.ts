/**
 * Supabase server client for API routes (service role — never import in client components).
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client using server-only credentials from env.
 *
 * @returns Configured Supabase client without persisted auth session
 */
export function create_server_supabase_client(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const service_role_key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !service_role_key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for server API routes",
    );
  }

  return createClient(url, service_role_key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
