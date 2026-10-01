# Production hardening — Release 2.0

## Included

- Multi-account browser storage scoped by Supabase user UUID.
- Customer isolation through Supabase RLS.
- Scalable record-level cloud persistence through `hcm_records`.
- Automatic migration from legacy `hcm_user_data` when `hcm_records` is installed.
- Private construction-file bucket with authenticated policies and signed URLs.
- Payment receipt upload during creation and after creation.
- Receipt support for images and PDFs.
- Failed payment/bill/expense saves clean up uploaded files.
- Upload validation: JPG, PNG, WEBP and PDF; maximum 10 MB.
- Client-side image compression for large images.
- Correct ledger deletion for expenses and material purchases.
- Material aggregate totals corrected after purchase deletion.
- Local calendar date calculations.
- Spending streak based on paid activity.
- Dashboard/report spending distinguishes paid spending from committed/outstanding amounts.
- Worker monthly attendance uses real attendance records instead of hardcoded sample months.
- No fake receipt/stock-image fallback.
- No fake OCR values or confidence claims.
- Voice attendance refuses to silently create fewer workers than the spoken count.
- Stronger financial input validation.
- Logout flushes queued cloud writes before ending the session.

## Supabase

Run `supabase/production.sql` once in Supabase SQL Editor.

This creates:
- `hcm_user_data` as a compatibility layer
- `hcm_records` as the production record-level store
- RLS policies scoped to `auth.uid()`
- private `construction-files` storage

## OCR

OCR is a real integration point only. Configure `VITE_OCR_ENDPOINT` with a service that accepts multipart form data (`file`) and returns structured invoice data. Until configured, the application clearly reports that OCR is unavailable.

## Production validation

Before launch, test two different customer emails and verify complete data isolation, including private receipt access. See `REAL_WORLD_PRODUCT.md` for the full acceptance checklist.
