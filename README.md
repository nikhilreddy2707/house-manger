# House Construction Manager — Production Release 2.0

A multi-customer construction-management web application for tracking house projects, workers, attendance, materials, purchases, expenses, payments, receipts, budgets, progress, photos and reports.

## Production improvements in 2.0

- Multi-account Supabase authentication with account-scoped browser storage.
- Record-level cloud persistence through `hcm_records` instead of rewriting one giant workspace document.
- Automatic migration from the previous `hcm_user_data` JSON workspace.
- Private Supabase Storage with signed document URLs.
- Payment receipt upload during payment creation and after a payment has already been created.
- PDF/image receipt viewing.
- File validation and image optimization.
- Orphan-upload cleanup when a payment/bill save fails.
- Stronger payment status and reference handling.
- Correct material/expense ledger deletion.
- Local calendar date handling.
- Real streak and project-health calculations.
- No fake OCR data or fake confidence values.
- OCR integration point for a real external OCR provider.
- Production deployment and customer acceptance documentation.
- Existing lazy-loaded React views retained for fast navigation.

## Supabase setup

Run **`supabase/production.sql`** in the Supabase SQL Editor.

It creates:
- `hcm_user_data` compatibility storage
- `hcm_records` scalable record-level storage
- RLS policies for customer isolation
- private `construction-files` bucket
- user-folder Storage policies

The application automatically migrates an existing customer's legacy JSON workspace into `hcm_records` when the new table is available.

## Authentication

Enable Email authentication in Supabase.

For a real launch:
- configure the production Site URL
- configure Redirect URLs
- enable email confirmation if desired
- configure production SMTP for branded email delivery
- test at least two different customer emails

Never place a Supabase service-role key in frontend environment variables.

## Environment variables

Copy `.env.example` or configure the following in Netlify/Vercel:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_OCR_ENDPOINT=
```

`VITE_OCR_ENDPOINT` is optional. Bill scanning intentionally fails clearly when no real OCR service is configured; it never fabricates invoice results.

## Local development

```bash
npm ci
npm run dev
```

Production build:

```bash
npm run build
```

Type check:

```bash
npm run typecheck
```

Combined check:

```bash
npm run check
```

## Launch checklist

See **`REAL_WORLD_PRODUCT.md`** for the full customer acceptance test and production workflow.
