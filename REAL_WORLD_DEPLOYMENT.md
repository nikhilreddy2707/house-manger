# House Construction Manager — Real-World Deployment Checklist

This release is intended to move the product from a demo-style application toward a multi-customer production SaaS workflow.

## 1. Multi-account behavior

- Supabase Auth is the source of identity.
- Every customer gets a unique Supabase `auth.users.id`.
- `hcm_user_data.user_id` is the tenant boundary and has RLS policies using `auth.uid() = user_id`.
- Browser cache is scoped as `house-construction-manager-workspace-v3:<user-id>`.
- A new customer never inherits another customer's local browser workspace.
- The app must be tested with at least two different email addresses in the same browser after logout/login.

### Supabase Auth settings

In Supabase Dashboard → Authentication → Providers → Email:

1. Enable Email provider.
2. Configure the production Site URL to the deployed Netlify URL.
3. Configure the allowed redirect URLs for the deployed domain and local development URL.
4. Decide whether email confirmation is required. If enabled, users must confirm before first login.
5. Configure SMTP for production so confirmation and password-reset emails reliably reach customers.

## 2. Payment receipts

The payment form now supports:

- UPI screenshots
- Bank transfer receipts
- Cheque images
- PDF receipts
- Private Supabase Storage upload
- Signed URLs for viewing

Files are stored under the authenticated user's UUID and cannot be read through the application's storage policies by another user.

## 3. Bills and invoices

Bills support the same private storage flow. OCR is intentionally not simulated. A real OCR endpoint must be configured with:

`VITE_OCR_ENDPOINT`

The OCR response should include structured fields and optional confidence values. The user must review OCR results before saving them as financial records.

## 4. Production database

Run `supabase/schema.sql` once in the production Supabase project before launch.

The current compatibility layer keeps a workspace in JSONB. For larger customers, the next migration should normalize high-volume entities into PostgreSQL tables such as `projects`, `workers`, `attendance`, `materials`, `material_purchases`, `expenses`, `payments`, `budgets`, `stages`, `photos`, and `bills`.

## 5. Production safeguards

- Do not put a Supabase service-role key in Vite environment variables.
- Keep RLS enabled.
- Keep `construction-files` private.
- Use signed URLs for receipts and photos.
- Keep upload size/type validation enabled.
- Configure backups and database monitoring in Supabase.
- Configure a custom domain for the production Netlify site.
- Configure SMTP before public launch.

## 6. Customer acceptance test

Before launch, test this exact sequence:

1. Customer A signs up with email A.
2. Customer A creates Project A and uploads a receipt.
3. Log out.
4. Customer B signs up with email B in the same browser.
5. Customer B must see a fresh empty workspace, not Customer A's records.
6. Customer B creates Project B and uploads a different receipt.
7. Log out and sign back in as Customer A.
8. Customer A must see only Project A and its files.
9. Open Customer B's receipt URL while authenticated as Customer A; it must not be accessible through the app's storage policy.
10. Test a payment with an image receipt and a PDF receipt.
11. Test a payment without a receipt and confirm the UI clearly shows that no proof is attached.
12. Test password reset and email confirmation on the production domain.
