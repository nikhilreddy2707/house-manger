# GitHub → Netlify deployment

This repository is a Vite React SPA.

## Required repository root

`package.json`, `index.html`, `vite.config.ts`, `netlify.toml`, `src/`, `public/`, and `netlify/` must be at the repository root. Do not upload this ZIP file into GitHub as the project root.

## Netlify build settings

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Node: 20

## SPA routing

`public/_redirects` contains:

```
/*    /index.html   200
```

Netlify copies this into `dist/`, so browser refreshes and client-side routes do not return a Netlify 404.

## Environment variables

Set these in Netlify, not GitHub:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `MAILBOXLAYER_API_KEY`

After changing environment variables, trigger a new deploy because Vite injects `VITE_*` variables during build.

## GitHub update workflow

Do not upload the ZIP to GitHub. Extract it, put the extracted files at the repository root, then commit/push:

```
git add .
git commit -m "Fix Netlify SPA routing"
git push origin main
```

Netlify will automatically deploy the same site.
