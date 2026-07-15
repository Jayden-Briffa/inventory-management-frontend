# Frontend Dependencies

This document explains the frontend dependency stack used in the inventory management frontend and how each dependency contributes to development and runtime behavior.

## Runtime dependencies

These packages are required by the app when it runs in development or production.

- `vue`: Core UI framework used to build the application.
- `vue-router`: Client-side routing for multi-view navigation.
- `pinia`: Centralized state management for shared app state.
- `primevue`: UI component library for form controls, tables, dialogs, and interaction patterns.
- `@primevue/themes`: Theme presets for PrimeVue components.
- `primeicons`: Icon set used by PrimeVue and custom UI.
- `vue-qrcode-reader`: QR scanner/reader support for borrow/check-out flows.
- `@tailwindcss/vite`: Vite integration for Tailwind CSS.
- `json-server`: Local mock API server used with `data/data.json`.

## Development dependencies

These packages support build, testing, linting, formatting, and TypeScript authoring.

- Build and bundling:
  - `vite`
  - `@vitejs/plugin-vue`
  - `@vitejs/plugin-vue-jsx`
  - `vite-plugin-vue-devtools`
- TypeScript and type checking:
  - `typescript`
  - `vue-tsc`
  - `@vue/tsconfig`
  - `@tsconfig/node24`
  - `@types/node`
  - `@types/jsdom`
- Unit testing:
  - `vitest`
  - `@vue/test-utils`
  - `jsdom`
- End-to-end testing:
  - `@playwright/test`
- Linting and formatting:
  - `eslint`
  - `eslint-plugin-vue`
  - `@vue/eslint-config-typescript`
  - `eslint-plugin-playwright`
  - `@vitest/eslint-plugin`
  - `oxlint`
  - `eslint-plugin-oxlint`
  - `eslint-config-prettier`
  - `prettier`
- CSS tooling:
  - `tailwindcss`
  - `postcss`
  - `sass`
  - `sass-embedded`
- Script orchestration and config loading:
  - `npm-run-all2`
  - `jiti`

## Dependency roles in local development

- `json-server` powers mock backend data from `data/data.json` on port `5050`.
- Vite proxies `/api/*` requests to `http://localhost:5050/*`, allowing frontend code to call API-like routes without CORS setup.
- Tailwind is enabled through the Vite plugin to keep styling integrated into the app build pipeline.

## How to run with dependencies

From the project root:

1. Install dependencies:
   - `npm install`
2. Start the mock API:
   - `npm run serve-json`
3. In a second terminal, start the frontend:
   - `npm run dev`

Optional quality commands:

- `npm run lint`
- `npm run test:unit`
- `npm run test:e2e`
- `npm run build`

## Current component status

The current application entrypoint is:

- `src/main.ts`: Vue app bootstrap and mount.
- `src/App.vue`: Root component.

The frontend also includes reusable and feature-level UI components in `src/components`.
As the UI surface expands, keep this document up to date with dependency usage by major feature areas (for example, PrimeVue widgets, Pinia stores, and QR scanner integration).
