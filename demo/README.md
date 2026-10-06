# DataWill Demo (optional React version)

An alternative preview of DataWill v0.1 written in React + Vite. It renders the Markdown files and shows the schema and examples.

The page served by GitHub Pages is the static `../index.html`, maintained with `python ../scripts/sync_index.py`. This folder is optional.

## How it works

- Imports `../SPEC.md`, `../README.md`, `../QUESTIONS.md`, `../examples/*` and `../schema/*` at build time (Vite `?raw` / JSON imports), so nothing is copied by hand.
- System fonts only, no external requests.

## Development

```bash
cd demo
npm install
npm run dev
```

## Build

```bash
npm run build
```

Produces a single self-contained file in `demo/dist/index.html` (not tracked by git). To publish the React version instead of the static page, copy it over `../index.html`.

## License

MIT (see ../LICENSE)
