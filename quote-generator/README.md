# Poetry Quote Generator

A Next.js app serving curated ecstatic poetry quotes with category filtering, search, and favorites.

## Features

- Random quote generator with category filter
- Copy-to-clipboard
- Favorites (stored in localStorage, persist after reload)
- Responsive UI with shadcn/ui components
- Search by author or tag *not in MVP

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

`npm run dev`  starts the dev server (runs on local host)
`npm run build` to  test the production build (optionally `npm start` to serve the built app)

## Prod

 `vercel --prod` to deploy the build to prod on Verrcel (Vercel will run `npm run build` during deployment)

## Notes

- Quotes/categories/tags are defined in `lib/quotes.ts`; editing that file updates what the app renders.
