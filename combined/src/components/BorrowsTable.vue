<script setup lang="ts">
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import SearchBar from './SearchBar.vue';
import { onMounted, ref, computed } from 'vue';
import { getBorrows, deleteBorrow } from '@/apis/borrowMethods.js';
import UpdateBorrowForm from './UpdateBorrowForm.vue';
import type { Borrow } from '@/services/inventory';

type TableBorrow = Borrow & Record<string, unknown>
type TogglePayload = { obj: TableBorrow; checked: boolean }
 
const data = ref<TableBorrow[]>([])
const searchQuery = ref('')
const selectedObjects = ref<TableBorrow[]>([])
const isEditModalOpen = ref(false)
const objectToEdit = ref<TableBorrow | undefined>(undefined)

const filteredItems = computed<TableBorrow[]>(() => {
  // Filtering based on search query
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    return data.value
  }
  return data.value.filter((borrow) => {
    const email = borrow.email?.toLowerCase() ?? ''
    return email.includes(query)
  })
})

const refreshList = async () => {
  data.value = ((await getBorrows()) ?? []) as TableBorrow[]
}

onMounted(async () => {
    await refreshList()
})

const editFunc = (obj: TableBorrow) => {console.log(`Editing borrow #${obj.borrowId}`); objectToEdit.value = obj; openModal()} 
const delFunc = async (obj: TableBorrow) => { await deleteBorrow(obj.borrowId); await refreshList() }

const handleToggleSelect = ({ obj, checked }: TogglePayload) => {
  const objIdx = selectedObjects.value.findIndex(o => o.borrowId === obj.borrowId)

    if (checked && objIdx === -1) {
        selectedObjects.value.push(obj)
    } else if (!checked && objIdx !== -1) {
        selectedObjects.value.splice(objIdx, 1)
    }

    console.log(selectedObjects.value)
}


const formatters = {
  borrowDate: (value: unknown): string => {
    if (!value) return ''

    const d = new Date(String(value))
    const date = d.toLocaleDateString('en-GB') // DD/MM/YYYY
    const time = d.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}) // HH:MM

    return `${date}, ${time}`
  },

  expectedReturnDate: (value: unknown): string => {
    if (!value) return ''

    const d = new Date(String(value))
    return d.toLocaleDateString('en-GB') // DD/MM/YYYY
  },

  isReturned: (value: unknown): string => {
    return value ? 'Returned' : 'Active'
  }
}

const fieldLabels = {
  itemId: 'Item ID',
  email: 'User',
  expectedReturnDate: 'Expected Return Date',
  borrowId: 'Borrow ID',
  borrowDate: 'Borrow Date',
  isReturned: 'Status'
}


const openModal = () => {
    isEditModalOpen.value = true
}

const closeModal = () => {
    isEditModalOpen.value = false
}

</script>

<template>
    <SearchBar @update:input="searchQuery = $event" placeholder="Search for a borrow..."/> 
  <Table :data="filteredItems" :exclude-fields="['id']" :editFunc :delFunc :selectedObjects="selectedObjects" @toggleSelect="handleToggleSelect" :formatters="formatters" :fieldLabels="fieldLabels" rowKey="borrowId"/>
    <Modal title="Edit borrow" v-model:show="isEditModalOpen">
        <div style="display: flex; justify-content: center;">
            <UpdateBorrowForm :borrow="objectToEdit" @update="refreshList(); closeModal()" />
        </div>
    </Modal>
</template>