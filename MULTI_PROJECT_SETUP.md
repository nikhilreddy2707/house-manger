# Multi-project version

This build supports multiple independent construction projects per authenticated user.

- New projects start empty.
- Switching projects changes every dashboard/list/report to the selected project's data.
- Project A data is not merged into Project B.
- The active project persists in the Supabase-backed workspace.
- Legacy v2 demo records are removed during migration while generated user records are preserved.
- Demo data is only loaded when the user explicitly chooses Reset Demo.

## Supabase

No new SQL table is required for this version because the existing `hcm_user_data` JSONB record now stores a versioned workspace with separate project buckets. Keep the existing authenticated RLS policy that restricts rows by `user_id`.

## Netlify

Build command: `npm run build`
Publish directory: `dist`
Node: 20+
