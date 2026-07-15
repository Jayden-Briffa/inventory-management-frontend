# Frontend Components

This document lists the components in `src/components` and what they are responsible for.

## Core components

- `Table.vue`: Generic data table with optional row selection, formatting callbacks, field labels, and per-row action buttons.
- `Modal.vue`: Reusable modal with backdrop, close behavior, and transition animation.
- `Loading.vue`: Placeholder loading state component.
- `SearchBar.vue`: Text input component that emits `update:input` on user input.
- `ItemsTable.vue`: Feature table wrapper for inventory items, with search, formatting, and edit/delete flow.
- `BorrowsTable.vue`: Feature table wrapper for borrows, with search, formatting, and edit/delete flow.
- `UpdateItemForm.vue`: Form used to patch item records.
- `UpdateBorrowForm.vue`: Form used to patch borrow records.
- `QrScanner.vue`: QR scanning component that confirms scanned payload and emits normalized code.
- `QrBorrow.vue`: Borrow flow component driven by scanned QR item lookup.
- `BorrowItemModal.vue`: Specialized modal for borrowing an item.
- `PasswordModal.vue`: Keypad-style modal for entering numeric access codes.

## Support modules added for component imports

- `src/apis/itemMethods.js`
- `src/apis/borrowMethods.js`
- `src/services/inventory.ts`

These modules are required because several components depend on `@/apis/*` and `@/services/*` imports.

## Notes

- Components are available in `src/components` and can be integrated into application routes/views as needed.
- API methods expect `VITE_INVENTORY_API_BASE_URL` to be configured.

## Application views and navigation

- `src/App.vue`: Root shell with navigation links and `RouterView` outlet.
- `src/router/index.ts`: Route map for homepage (`/`), borrow flow (`/borrow`), and admin tables (`/admin`).
- `src/views/HomeView.vue`: Homepage with email entry, recent borrower suggestions, and QR scan entrypoint.
- `src/views/BorrowView.vue`: Borrow page that receives selected email and handles scan-to-borrow flow.
- `src/views/AdminView.vue`: Admin page with table toggle between borrows and items.
