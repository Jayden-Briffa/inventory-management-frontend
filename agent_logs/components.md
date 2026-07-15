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
