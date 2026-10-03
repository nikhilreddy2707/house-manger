# House Construction Manager

A web app for managing a house construction project: track expenses, budget, bills, payments, workers, materials, progress and photos, and generate reports. Each user signs in with email and password, and their data is stored securely in Supabase. One account can manage several independent projects.

## Features

- Dashboard with a summary of the active project
- Expenses, budget, bills and payments
- Daily and monthly spending views and a construction ledger
- Workers: profiles and attendance
- Materials, progress tracking and photo uploads
- Reports
- Voice assistant
- Multiple projects per account, with separate data for each
- Email and password authentication (Supabase)

## Tech stack

| Area | Tools |
|---|---|
| UI | React 18, TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Charts and icons | Recharts, lucide-react |
| Backend | Supabase (Auth, Postgres, Storage) |
| Hosting | Netlify |

## Project structure

```
house-construction-manager/
├── src/
│   ├── api/                  Data layer: Supabase client, local state, seed data
│   ├── components/           One folder per screen
│   │   ├── common/           Shared pieces: toast, dialogs, loaders
│   │   ├── layout/           Header, sidebar, mobile navigation
│   │   └── ...               dashboard, expenses, budget, workers, reports, etc.
│   ├── App.tsx               App shell and navigation
│   ├── AuthScreen.tsx        Login and sign-up screen
│   ├── main.tsx              Entry point
│   ├── types.ts              Shared TypeScript types
│   └── index.css             Global styles
├── supabase/
│   └── schema.sql            Database table, security policies and storage bucket
├── docs/
│   ├── DEPLOYMENT.md         Netlify and Supabase setup
│   └── MULTI_PROJECT.md      How multiple projects work
├── app/
│   └── index.html            Vite template used by dev and build (do not open directly)
├── index.html                READY TO OPEN: the full app in one file, double-click it
├── package.json              Scripts and dependencies
├── vite.config.ts            Vite config (dev, Netlify build and standalone build)
├── tailwind.config.js        Tailwind config
├── postcss.config.js         PostCSS config
├── tsconfig.json             TypeScript config
├── netlify.toml              Netlify build settings
└── .env.example              Template for environment variables
```

## Getting started

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The page refreshes when you save a file.

### Environment variables

Copy `.env.example` to `.env` and fill in your Supabase values:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Only use the publishable (anon) key. Never put a service role key in this project.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server at `http://localhost:5173` |
| `npm run build` | Creates the production build in `dist/` (used by Netlify) |
| `npm run preview` | Serves the production build locally at `http://localhost:4173` |
| `npm run build:standalone` | Rebuilds the ready-to-open `index.html` in the project root |

## Opening the app without a server

Open `index.html` in the project root by double-clicking it. It is the full app in one file, so no server or install is needed. It needs an internet connection for login.

After you change the code, run `npm run build:standalone` to refresh that file.

Email confirmation and password reset links return to your deployed site, not to this file. Use `npm run dev` when you test those.

The file `app/index.html` is only the template that Vite uses for `npm run dev` and `npm run build`. It shows a blank page if opened directly.

## Deployment

The app deploys to Netlify. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the Supabase and Netlify setup.

## Security

Row Level Security restricts each user's data to their own account. The publishable Supabase key is designed to be used in the browser. Run `supabase/schema.sql` in your Supabase project so these policies exist.
