# Production Deployment — Netlify + Supabase

## 1. Netlify build
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20+

## 2. Supabase database
Open Supabase → SQL Editor and run:

`supabase/production.sql`

This is the recommended production schema. It includes the legacy compatibility table plus the scalable `hcm_records` table.

## 3. Authentication
Supabase → Authentication → Providers → Email:
- Enable Email provider.
- Decide whether email confirmation is required.
- Configure production SMTP before public launch.

Supabase → Authentication → URL Configuration:
- Site URL: your actual Netlify URL.
- Redirect URLs: your actual application URL and any password-reset callback URL used by the deployment.

## 4. Netlify environment variables
Configure these in the Netlify dashboard, not by committing secrets:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- Optional: `VITE_OCR_ENDPOINT`

Only use the Supabase publishable/anon key in frontend variables. Never expose a service-role key.

## 5. Customer isolation test
Before announcing the product:

1. Create customer account A with email A.
2. Create a project and add a payment/receipt.
3. Sign out.
4. Create customer account B with email B.
5. Confirm B sees an empty workspace.
6. Confirm B cannot open A's receipt URL.
7. Sign out and sign back in as A.
8. Confirm A's project and receipt are still present.

## 6. Payment receipt test
Test:
- UPI screenshot
- bank receipt
- cheque image
- PDF receipt
- attach receipt while recording payment
- attach receipt later to an existing payment
- view image
- view PDF
- failed upload/save cleanup

## 7. OCR
OCR is not simulated. Configure a real provider through `VITE_OCR_ENDPOINT` and return the documented JSON structure before exposing bill scanning to customers.

## Mailboxlayer

Add `MAILBOXLAYER_API_KEY` as a Netlify server-side environment variable. Do not use a `VITE_` prefix. The application calls `/.netlify/functions/validate-email` during signup.
