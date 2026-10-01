# House Construction Manager — Real Product Standard

This version is intended to behave as a multi-customer construction-management SaaS, not a demo-only dashboard.

## Customer lifecycle
1. Customer creates an account with a unique email.
2. Email confirmation/password reset are handled by Supabase Auth.
3. The browser cache is scoped to the authenticated Supabase user UUID.
4. Customer data is isolated by RLS (`auth.uid() = user_id`).
5. Each project has its own project ID and its own workers, attendance, materials, purchases, expenses, payments, budgets, stages, photos and bills.
6. Payment proof and construction documents are stored in a private bucket and viewed through short-lived signed URLs.

## Financial workflow
- Record a payment as Paid or Pending.
- Store payment method and transaction/reference number.
- Attach a UPI screenshot, bank receipt, cheque image or PDF.
- Add a receipt later if it was not available when the payment was recorded.
- Paid payments can be converted into a ledger expense exactly once.
- Material purchases are separate ledger transactions and are not double-counted as expenses.

## Production data architecture
When `hcm_records` exists, the app uses record-level cloud persistence. This avoids rewriting one giant workspace JSON document whenever one expense or payment changes. Existing `hcm_user_data` records are migrated automatically on first login after the production schema is installed.

## Required Supabase setup
Run `supabase/production.sql` in the Supabase SQL Editor.

In Authentication:
- Enable Email provider.
- Set the production Site URL to the deployed Netlify/Vercel URL.
- Add the same URL and any password-reset callback URLs to Redirect URLs.
- Configure SMTP for branded production email delivery before public launch.

In Netlify/Vercel environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- Optional: `VITE_OCR_ENDPOINT`

Never place a Supabase service-role key in Vite/frontend environment variables.

## Launch acceptance test
Create two different customer emails and verify:
- Customer A cannot see Customer B's projects.
- Customer B starts with an empty workspace.
- A receipt uploaded by A cannot be opened by B.
- Logout and login with B changes the local cache scope.
- Refresh preserves each account's data.
- A payment receipt can be uploaded, viewed, and added later.
- A PDF receipt opens in the document viewer.
- A failed payment save does not leave an orphaned uploaded receipt.
- A failed cloud write remains queued for retry.

## Known external dependency
OCR is deliberately not faked. A real OCR endpoint must be configured before customers use bill scanning. The app will clearly report that OCR is unavailable rather than inventing extracted values or confidence scores.
