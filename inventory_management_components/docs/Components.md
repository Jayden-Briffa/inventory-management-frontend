# Table

Reusable data table component for rendering a list of objects in a grid layout.

## Purpose

Use `Table` when you need to:

- Display an array of objects as rows
- Hide selected object fields from the UI
- Show optional row actions such as edit or delete
- Support row selection with checkboxes

If no data fields are available yet, the component renders `Loading` instead.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `id` | `string` | Optional id applied to the root `<section>`. |
| `data` | `object` | Array-like data source used to build rows and derive table columns from the first item. |
| `excludeFields` | `string[]` | Fields to hide from the rendered columns. Defaults to `[]`. |
| `selectedObjects` | `object[]` | Optional selected row list. When provided, a checkbox column is shown. |
| `editFunc` | `function` | Optional handler called with the row object when `Edit` is clicked. |
| `delFunc` | `function` | Optional handler called with the row object when `Del` is clicked. |
| `otherFunc` | `function` | Optional handler called with the row object when `Other` is clicked. |

The presence of button functions makes the table render the relevent buttons, e.g., passing only editFunc will make the options column show only the "Edit" button

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `toggleSelect` | `{ obj, checked }` | Fired when a row checkbox is toggled. |

## Behavior

- Column names are taken from the keys of the first object in `data`.
- Any keys listed in `excludeFields` are removed from the visible columns.
- An `Options` column is added when at least one action handler is provided.
- A `Select` column is added when `selectedObjects` is provided.

## Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Table from '../src/components/Table.vue'

const rows = [
  { id: 1, name: 'Keyboard', sku: 'KB-100', quantity: 15 },
  { id: 2, name: 'Mouse', sku: 'MS-200', quantity: 24 },
]

const selectedRows = ref([])

const handleToggleSelect = ({ obj, checked }) => {
  selectedRows.value = checked
    ? [...selectedRows.value, obj]
    : selectedRows.value.filter(item => item.id !== obj.id)
}

const editRow = (row) => console.log('Edit', row)
const deleteRow = (row) => console.log('Delete', row)
</script>

<template>
  <Table
    id="inventory-table"
    :data="rows"
    :exclude-fields="['id']"
    :selected-objects="selectedRows"
    :edit-func="editRow"
    :del-func="deleteRow"
    @toggle-select="handleToggleSelect"
  />
</template>
```

## Notes

- Each row object should include a unique `id`, because that value is used as the Vue key and for selection checks.
- The component expects `data[0]` to exist before it can derive columns.

# Modal

Lightweight modal container for showing titled overlay content controlled by a parent component.

## Purpose

Use `Modal` when you need to:

- Show temporary content above the main page
- Control visibility from a parent component with a boolean flag
- Provide a simple close button inside the modal header
- Render custom content through a slot

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `id` | `string` | Optional id applied to the root `<section>`. |
| `title` | `string` | Title shown in the modal header. |
| `show` | `boolean` | Controls whether the modal is rendered. |

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `update:show` | `false` | Fired when the close button is clicked so the parent can hide the modal. |

## Slots

| Slot | Description |
| --- | --- |
| default | Renders the modal body content. |

## Behavior

- The modal is only rendered when `show` is `true`.
- Clicking the close button emits `update:show` with `false`.
- The title is displayed in the header row above the slotted content.
- The component uses absolute positioning and centers itself horizontally on the page.

## Example

```vue
<script setup>
import { ref } from 'vue'
import Modal from '../src/components/Modal.vue'

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

## Notes

- This component does not render a backdrop or trap focus.
- Closing is currently handled only through the header button and parent state updates.
