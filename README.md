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
