# Component merge log

## 2026-07-15

- Retrieved and copied components into `combined/src/components`:
  - Core: `Table.vue`, `Modal.vue`, `Loading.vue`, `SearchBar.vue`
  - Feature wrappers/forms: `ItemsTable.vue`, `BorrowsTable.vue`, `UpdateItemForm.vue`, `UpdateBorrowForm.vue`
  - QR and borrow flow: `QrScanner.vue`, `QrBorrow.vue`, `BorrowItemModal.vue`, `PasswordModal.vue`
- Added supporting imports required by retrieved components:
  - `combined/src/apis/itemMethods.js`
  - `combined/src/apis/borrowMethods.js`
  - `combined/src/services/inventory.ts`

Decision rationale:
- Selected Yara table/modal stack for the most complete generic table behavior and wrapper integration.
- Selected George QR scanner and borrow component for stronger scan-confirm flow.
- Included Jayden specialized modals because they are unique and reusable.

## 2026-07-15 (typing cleanup)

- Refactored `combined/src/components` scripts toward idiomatic Vue + TypeScript typing.
- Replaced broad runtime-style typings (`Object`, `Function`, implicit `any`) with explicit TypeScript props/event signatures.
- Updated shared components (`Table.vue`, `Modal.vue`, `SearchBar.vue`) to use typed `defineProps`/`withDefaults` and typed `defineEmits`.
- Updated wrapper components (`ItemsTable.vue`, `BorrowsTable.vue`) to typed array refs and typed selection payload handling.
- Updated form components (`UpdateItemForm.vue`, `UpdateBorrowForm.vue`) with typed prop payloads and safe optional guards.
- Updated modal/QR components (`BorrowItemModal.vue`, `PasswordModal.vue`, `QrBorrow.vue`, `QrScanner.vue`) with stricter emit/callback/event typing.

Decision rationale:
- Priority was type safety and maintainability without changing intended behavior.
- Kept API surface and event names stable so existing parent integrations remain compatible.
