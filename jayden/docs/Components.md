# Component Usage

This document covers the usage of the `Modal` and `Table` components used by the inventory management interface.

## Modal

A lightweight overlay container that renders when the parent controls visibility.

### Props

| Prop | Type | Description |
| --- | --- | --- |
| `id` | `string` | Optional id applied to the root `<section>`. |
| `title` | `string` | Title shown in the modal header. |
| `show` | `boolean` | Controls whether the modal is rendered. |

### Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:show` | `false` | Emitted when the close button is clicked. The parent should update the `show` state accordingly. |

### Usage

- The modal renders only while `show` is `true`.
- The default slot is used for modal body content.
- Closing the modal is handled by the header button, which emits `update:show` with `false`.
- There is no backdrop or focus-trap behavior built in.

### Example

```vue
<script setup>
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'

const isOpen = ref(false)
</script>

<template>
  <button @click="isOpen = true">Open modal</button>

  <Modal
    id="product-modal"
    title="Product details"
    :show="isOpen"
    @update:show="isOpen = $event"
  >
    <p>Inventory details go here.</p>
  </Modal>
</template>
```

## Table

A reusable table component for displaying arrays of objects as rows with optional selection and action buttons.

### Props

| Prop | Type | Description |
| --- | --- | --- |
| `id` | `string` | Optional id applied to the root container. |
| `data` | `object` | Expected to be an array of row objects. Visible columns are derived from the first item. |
| `excludeFields` | `string[]` | Keys to hide from the rendered columns. Defaults to `[]`. |
| `includeFields` | `string[]` | When set, only these field keys are displayed. |
| `fieldAliases` | `object` | Maps field keys to custom header labels. |
| `hideFields` | `boolean` | If true, header labels are not rendered. |
| `selectFunc` | `function` | When provided, a checkbox column appears and this function receives the selected rows array. |
| `editFunc` | `function` | When provided, an `Edit` button appears for each row and is called with the row object. |
| `delFunc` | `function` | When provided, a `Del` button appears for each row and is called with the row object. |
| `returnFunc` | `function` | When provided, a `Return` button appears for each row and is called with the row object. |

### Events

| Event | Payload | Description |
| --- | --- | --- |
| `clickRow` | `object` | Emitted when a row element is clicked; payload is the row object. |

### Usage

- The component uses `data[0]` to infer the available columns.
- `includeFields` and `excludeFields` are mutually exclusive: if `includeFields` is set, only those keys are shown.
- If `selectFunc` is provided, a `Select` column is rendered and row checkboxes track selection state.
- If any of `editFunc`, `delFunc`, or `returnFunc` are provided, an `Options` column appears.
- If no row fields are available yet, the component displays the `Loading` placeholder.
- Row objects should include a unique `id` field for keys and selection logic.

### Example

```vue
<script setup>
import { ref } from 'vue'
import Table from '@/components/Table.vue'

const rows = ref([
  { id: 1, name: 'Keyboard', sku: 'KB-100', quantity: 15 },
  { id: 2, name: 'Mouse', sku: 'MS-200', quantity: 24 },
])

const selectedRows = ref([])

const selectRows = (newSelection) => {
  selectedRows.value = newSelection
}

const editRow = (row) => console.log('Edit row', row)
const deleteRow = (row) => console.log('Delete row', row)
const returnRow = (row) => console.log('Return row', row)
const handleRowClick = (row) => console.log('Row clicked', row)
</script>

<template>
  <Table
    id="inventory-table"
    :data="rows"
    :exclude-fields="['id']"
    :field-aliases="{ quantity: 'Stock' }"
    :select-func="selectRows"
    :edit-func="editRow"
    :del-func="deleteRow"
    :return-func="returnRow"
    @clickRow="handleRowClick"
  />
</template>
```

### Notes

- `fieldAliases` alters header labels but does not affect row data keys.
- `hideFields` can be used to show only row values without headers.
- The component will only derive columns once it has at least one row in `data`.
