<script setup>
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import SearchBar from './SearchBar.vue';
import { reactive, onMounted, ref, computed } from 'vue';
import { getBorrows, deleteBorrow } from '@/apis/borrowMethods.js';
import UpdateBorrowForm from './UpdateBorrowForm.vue';
 
const data = reactive({})
const searchQuery = ref('')
const selectedObjects = ref([])
const isEditModalOpen = ref(false)
const objectToEdit = ref({})

const filteredItems = computed(() => {
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
    data.value = await getBorrows()
}

onMounted(async () => {
    await refreshList()
})

const editFunc = (obj) => {console.log(`Editing borrow #${obj.borrowId}`); objectToEdit.value = obj; openModal()} 
const delFunc = async (obj) => { await deleteBorrow(obj.borrowId); await refreshList() }

const handleToggleSelect = ({ obj, checked }) => {
    const objIdx = selectedObjects.value.findIndex(o => o.id === obj)

    if (checked && objIdx === -1) {
        selectedObjects.value.push(obj)
    } else if (!checked && objIdx !== -1) {
        selectedObjects.value.splice(objIdx, 1)
    }

    console.log(selectedObjects.value)
}


const formatters = {
  borrowDate: (value) => {
    if (!value) return ''

    const d = new Date(value)
    const date = d.toLocaleDateString('en-GB') // DD/MM/YYYY
    const time = d.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}) // HH:MM

    return `${date}, ${time}`
  },

  expectedReturnDate: (value) => {
    if (!value) return ''

    const d = new Date(value)
    return d.toLocaleDateString('en-GB') // DD/MM/YYYY
  },

  isReturned: (value) => {
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
    <Table :data="filteredItems" exclude-fields="id" :editFunc :delFunc :selectedObjects="selectedObjects" @toggleSelect="handleToggleSelect" :formatters="formatters" :fieldLabels="fieldLabels" rowKey="borrowId"/>
    <Modal title="Edit borrow" v-model:show="isEditModalOpen">
        <div style="display: flex; justify-content: center;">
            <UpdateBorrowForm :borrow="objectToEdit" @update="refreshList(); closeModal()" />
        </div>
    </Modal>
</template>