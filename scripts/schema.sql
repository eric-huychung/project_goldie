/**
 * Vendor payments table and indexes for the GOLDIE sample dataset.
 * Run via `npm run db:schema` or the Supabase SQL editor.
 */

CREATE TABLE IF NOT EXISTS vendor_payments (
  id BIGSERIAL PRIMARY KEY,
  bien TEXT NOT NULL,
  fy SMALLINT NOT NULL,
  fmonth SMALLINT NOT NULL,
  agy SMALLINT NOT NULL,
  agency TEXT NOT NULL,
  object_code TEXT NOT NULL,
  category TEXT NOT NULL,
  subobj TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  vendor TEXT NOT NULL,
  amount NUMERIC(18, 2) NOT NULL,
  source_sheet TEXT NOT NULL,
  imported_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vendor_payments_fy ON vendor_payments (fy);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_fmonth ON vendor_payments (fmonth);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_agy ON vendor_payments (agy);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_agency ON vendor_payments (agency);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_category ON vendor_payments (category);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_vendor ON vendor_payments (vendor);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_amount ON vendor_payments (amount);
CREATE INDEX IF NOT EXISTS idx_vendor_payments_fy_fmonth ON vendor_payments (fy, fmonth);

CREATE OR REPLACE VIEW vendor_payments_dataset_summary AS
SELECT
  count(*)::bigint AS row_count,
  count(DISTINCT fy)::int AS fiscal_year_count,
  min(fy)::smallint AS fy_min,
  max(fy)::smallint AS fy_max,
  sum(amount)::numeric(18, 2) AS total_amount,
  max(imported_at) AS last_imported_at
FROM vendor_payments;
