# Release 2.0 — Demo to Real Construction Management

## Customer/account fixes
- Separate browser cache per authenticated Supabase user.
- New accounts never inherit another customer's local workspace.
- Friendly duplicate-email signup handling.
- Stronger password minimum in the UI (8 characters).
- Logout flushes pending cloud writes.

## Construction management fixes
- Real project-level records remain isolated by project ID.
- Paid spending and committed/outstanding amounts are distinguished.
- Budget health uses committed spending.
- Spending streak uses paid transactions.
- Worker monthly breakdown comes from actual attendance records.
- Reports no longer show hard-coded sample percentages or fake verification labels.

## Financial/document fixes
- Record payment as Paid or Pending.
- UPI/bank reference number stored with payment.
- Receipt upload at payment creation.
- Receipt upload later for an existing payment.
- Receipt upload for manual expenses.
- Image/PDF viewing.
- Private storage and signed URLs.
- Upload validation and image optimization.
- Failed saves clean up orphaned uploads.

## Data architecture
- Added `hcm_records` record-level persistence.
- Existing `hcm_user_data` is retained as a compatibility fallback.
- Existing JSON customers are migrated automatically after `hcm_records` is installed.

## AI/OCR honesty
- Removed simulated OCR output and hard-coded confidence.
- OCR works only when a real OCR endpoint is configured.
- Voice parser remains a controlled extraction feature and does not silently create unregistered workers.

## Verification limitation
The project source was checked with the system TypeScript compiler. A full Vite build could not be executed in the sandbox because npm dependency downloads were unavailable/timed out. Run `npm ci && npm run check` in your local/network-enabled environment before deployment.
