# Setup merge decisions

## 2026-07-08

- Initialized `combined` setup/config from `Yara` as baseline because it already included Vite + testing + linting + Tailwind integration.
- Merged `jayden` setup additions into `combined/package.json`:
  - Added `@primevue/themes`, `primevue`, and `json-server`.
  - Added `serve-json` script (`json-server --watch data/data.json --port 5050`).
- Merged Vite server behavior from `jayden/vite.config.ts` into `combined/vite.config.ts`:
  - Enabled polling watch mode.
  - Enabled `/api` proxy to `http://localhost:5050` with rewrite.
- Kept `George`/`Yara` plugin stack in Vite (`vue`, `vueJsx`, `vueDevTools`, `tailwindcss`) because it is the most complete union.
- Added minimal `combined/src` bootstrap (`main.ts`, `App.vue`) and `combined/data/data.json` so setup scripts/config have valid target files.
