# House Construction Manager — Hardened Release

This release focuses on correctness, security, data integrity, and performance safeguards while preserving the existing UI and features.

## Main fixes

- Secure private construction-file storage with signed URLs.
- File validation and client-side image optimization.
- No fake stock receipt images.
- No fake OCR confidence or simulated invoice data.
- Correct ledger deletion for expenses and material purchases.
- Correct material aggregate totals after purchase deletion.
- Local-time date handling.
- Real spending streak calculation.
- More meaningful dashboard health score.
- Stronger financial input validation.
- Safer voice attendance: the app no longer silently maps a requested worker count to fewer registered workers.
- Lazy-loaded feature pages remain in place.

## Before deployment

1. Run `supabase/schema.sql` in the Supabase SQL Editor.
2. Set the Supabase environment variables from `.env.example`.
3. Configure `VITE_OCR_ENDPOINT` if bill OCR is required.
4. Run `npm ci`.
5. Run `npm run build`.

## Scale note

The compatibility JSONB workspace remains intentionally available so existing data is not destructively migrated. For very large production datasets, use the normalized-table migration described in `PRODUCTION_HARDENING.md`.
