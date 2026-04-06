# Md2Pdf

Md2Pdf is a React + Vite application that runs in the browser and lets you edit Markdown with live preview, then export it as PDF.

## Project Goal

The goal of this project is to provide a **backend-free** workflow for writing Markdown, previewing it instantly, and generating a shareable PDF output. The app runs entirely on the client side.

## Features

- Live Markdown editor with real-time preview
- GFM (GitHub Flavored Markdown) support via `remark-gfm`
- `.md` file upload (file picker or drag-and-drop)
- One-click copy to clipboard
- One-click PDF export (browser-based)
- Content clearing and word count display
- GitHub Pages-compatible publishing support via Vite `base` config

## Tech Stack

- **React 18** (UI)
- **TypeScript** (type safety)
- **Vite 5** (dev/build tooling)
- **react-markdown** + **remark-gfm** (Markdown rendering)
- **html2pdf.js** (preview-to-PDF conversion)
- **gh-pages** (manual GitHub Pages deploy)

## Setup and Run

> Node.js 18+ is recommended.

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build locally:

```bash
npm run preview
```

## `VITE_BASE_PATH` for GitHub Pages

In Vite config, the `base` value is read from `VITE_BASE_PATH`. When deploying under a repository path, run build like this:

```bash
VITE_BASE_PATH=/<repo>/ npm run build
```

Example:

```bash
VITE_BASE_PATH=/Md2Pdf/ npm run build
```

This ensures asset paths resolve correctly on GitHub Pages.

### Common Error: `GET .../src/main.tsx 404`

If you see `GET https://<username>.github.io/src/main.tsx 404` in the browser console, one of these is usually the cause:

1. **Wrong URL was opened.**  
   The project page is usually: `https://<username>.github.io/<repo>/`  
   Example: `https://adilx05.github.io/Md2Pdf/`
2. **Source files were published instead of `dist/`.**  
   Ensure your Pages source is the built output (`dist`) through GitHub Actions or `gh-pages -d dist`.

In this repo, `vite.config.ts` detects the repository name in CI (`GITHUB_REPOSITORY`) and automatically sets `base` to `/<repo>/`. So even without `VITE_BASE_PATH`, project-page deploys still resolve paths correctly.

## Automatic GitHub Pages Deploy (GitHub Actions)

This repo includes `.github/workflows/deploy.yml`, which runs automatic GitHub Pages deployment on every push to the `main` branch. The workflow installs Node, installs dependencies, builds with `VITE_BASE_PATH=/${{ github.event.repository.name }}/ npm run build`, then publishes the Pages artifact/deploy steps.

## Manual `gh-pages` Deployment

Use these steps as a **manual alternative** to automatic GitHub Actions deployment:

1. Ensure your `main` (or working) branch is up to date.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Build with the correct base path:

   ```bash
   VITE_BASE_PATH=/<repo>/ npm run build
   ```

4. Publish `dist/` to the `gh-pages` branch:

   ```bash
   npx gh-pages -d dist
   ```

   > Alternative: use `npm run deploy` if deploying to repository root.

5. In GitHub settings, go to **Settings → Pages** and set source to `gh-pages`.
6. Open the published URL and test the app.

## Known Limitations of Browser-Based PDF Export

- **Rendering differences:** PDF output can vary slightly by browser engine and OS.
- **Very long documents:** Large content may increase memory use and export time.
- **Page breaks:** Complex tables/code blocks may not always break perfectly.
- **Font/CORS effects:** External fonts/images may fail to load due to CORS.
- **Not a full print engine:** Browser-based output may be less deterministic than professional desktop publishing tools.

## License

No license file has been defined for this repository yet.
