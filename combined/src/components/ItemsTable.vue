<script setup lang="ts">
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import SearchBar from './SearchBar.vue';
import { onMounted, ref, computed } from 'vue';
import { getItems, deleteItem } from '@/apis/itemMethods';
import UpdateItemForm from '@/components/UpdateItemForm.vue';
import type { Item } from '@/services/inventory';

type TableItem = Item & Record<string, unknown>
type TogglePayload = { obj: TableItem; checked: boolean }

const data = ref<TableItem[]>([])
const searchQuery = ref('')
const selectedObjects = ref<TableItem[]>([])
const isEditModalOpen = ref(false)
const objectToEdit = ref<TableItem | undefined>(undefined)

const filteredItems = computed<TableItem[]>(() => {
  // Filtering based on search query
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    return data.value
  }
  return data.value.filter((item) => {
    const qrCode = item.qrCode?.toLowerCase() ?? ''
    const name = item.name?.toLowerCase() ?? ''
    const description = item.description?.toLowerCase() ?? ''
    return qrCode.includes(query) || name.includes(query) || description.includes(query)
  })
})


const refreshList = async () => {
  data.value = ((await getItems()) ?? []) as TableItem[]
}

onMounted(async () => {
    await refreshList()
})

const editFunc = (obj: TableItem) => {console.log(`Editing item #${obj.itemId}`); objectToEdit.value = obj; openModal()}
const delFunc = async (obj: TableItem) => { await deleteItem(obj.qrCode); await refreshList() }

const handleToggleSelect = ({ obj, checked }: TogglePayload) => {
  const objIdx = selectedObjects.value.findIndex(o => o.itemId === obj.itemId)

    if (checked && objIdx === -1) {
        selectedObjects.value.push(obj)
    } else if (!checked && objIdx !== -1) {
        selectedObjects.value.splice(objIdx, 1)
    }
    console.log(selectedObjects.value)
}

const openModal = () => {
    isEditModalOpen.value = true
}

const closeModal = () => {
    isEditModalOpen.value = false
}

const formatters = {
  isCollection: (value: unknown): string => {
    return value ? 'Collection' : 'Individual'
  },

  borrows: (value: unknown): number | string => {
    if (!value) return ''

    const borrows = Array.isArray(value)
      ? value.filter((borrow) => !borrow?.isReturned)
      : []

    return borrows.length //hyperlink to borrows

  },
}

const fieldLabels = {
  qrCode: 'QR Code',
  name: 'Item name',
  description: 'Item description',
  isCollection: 'Type',
  itemId: 'Item ID',
  borrows: 'Active borrows'
}

</script>

<template>
    <SearchBar @update:input="searchQuery = $event" placeholder="Search for an item..."/> 
  <Table :data="filteredItems" :exclude-fields="['id']" :editFunc :delFunc :selectedObjects="selectedObjects" @toggleSelect="handleToggleSelect" :formatters="formatters" :fieldLabels="fieldLabels" rowKey="itemId"/>
    <Modal title="Edit item" v-model:show="isEditModalOpen">
        <div style="display: flex; justify-content: center;">
            <UpdateItemForm :item="objectToEdit" @update="refreshList(); closeModal()" />
        </div>
    </Modal>
</template>