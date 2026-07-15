# Dependency documentation log

## 2026-07-15

- Added `combined/docs/frontend-dependencies.md` to document the current frontend dependency stack in `combined/package.json`.
- Documented runtime vs development dependencies and included role-based notes for:
  - Mock API (`json-server`)
  - Vite `/api` proxy behavior
  - Tailwind Vite integration
- Included run instructions (`npm install`, `npm run serve-json`, `npm run dev`) for local frontend + mock API workflow.
- Chose to document the exact dependencies currently present in `combined` instead of source-branch supersets, because `combined` is the authoritative target directory for execution and future merges.
