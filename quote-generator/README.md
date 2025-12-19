# Poetry Quote Generator

A Next.js app serving curated ecstatic poetry quotes with author filter, search, and favorites.

## Features

- Random quote generator with optional author filter
- Tag search (author dropdown to filter scope)
- Copy-to-clipboard
- Favorites (stored in localStorage, persist after reload)
- Responsive UI with shadcn/ui components
- Accessible-friendly palette and labels (higher-contrast golds, aria-labels on icon buttons)
- Dark mode toggle (persisted), reset filters, and inline empty-state messaging

## Project Structure

- `app/` — Next.js App Router pages/layout
- `components/` — UI and quote components
- `lib/quotes.ts` — quotes data and helpers
- `public/` — static assets
- `components.json` — shadcn config

## Getting Started

cd quote-generator
npm install

## Dev

`npm run dev`  starts the dev server (runs on local host); to test locally before pushing changes to prod
`npm run build` to  test the production build (optionally `npm start` to serve the built app)

## Prod

 `vercel --prod` to deploy the build to prod on Verrcel (Vercel will run `npm run build` during deployment)

## Notes

- Quotes, authors list, and tags are defined in `lib/quotes.ts`; editing that file updates what the app renders.
- The Next.js app lives in the `quote-generator/` subfolder; Vercel’s project root is set to that directory so builds run from there.
