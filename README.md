# rray89.github.io

Personal portfolio site rebuilt with Next.js App Router and static export in mind.

## Stack

- Next.js
- TypeScript
- App Router
- Static export (`output: 'export'`)

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

Static export output is written to `out/`.

## Preview The Export

```bash
npm run build
npm run start
```

This serves the generated `out/` directory, which is a closer match to GitHub Pages than `npm run dev`.

## Routes

- `/`
- `/projects/`

This repo is configured for a GitHub Pages-compatible static publish path and does not require Vercel services to build or export.

## Deployment

GitHub Pages deployment is handled by `.github/workflows/deploy-pages.yml`.

Once that workflow is merged, set the repository Pages source to **GitHub Actions** in GitHub Settings so `master` publishes the built `out/` artifact instead of the branch root.
