<script setup>
import Table from '@/components/Table.vue';
import Modal from '@/components/Modal.vue';
import SearchBar from './SearchBar.vue';
import { reactive, onMounted, ref, computed } from 'vue';
import { getItems, deleteItem } from '@/apis/itemMethods.js';
import UpdateItemForm from '@/components/UpdateItemForm.vue';

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
  return data.value.filter((item) => {
    const qrCode = item.qrCode?.toLowerCase() ?? ''
    const name = item.name?.toLowerCase() ?? ''
    const description = item.description?.toLowerCase() ?? ''
    return qrCode.includes(query) || name.includes(query) || description.includes(query)
  })
})


const refreshList = async () => {
    data.value = await getItems()
}

onMounted(async () => {
    await refreshList()
})

const editFunc = (obj) => {console.log(`Editing item #${obj.itemId}`); objectToEdit.value = obj; openModal()}
const delFunc = async (obj) => { await deleteItem(obj.qrCode); await refreshList() }

const handleToggleSelect = ({ obj, checked }) => {
    const objIdx = selectedObjects.value.findIndex(o => o.id === obj)

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
  isCollection: (value) => {
    return value ? 'Collection' : 'Individual'
  },

  borrows: (value) => {
    if (!value) return ''

    value = value.filter((borrow) => !borrow.isReturned)
    return value.length //hyperlink to borrows

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
    <Table :data="filteredItems" exclude-fields="id" :editFunc :delFunc :selectedObjects="selectedObjects" @toggleSelect="handleToggleSelect" :formatters="formatters" :fieldLabels="fieldLabels" rowKey="itemId"/>
    <Modal title="Edit item" v-model:show="isEditModalOpen">
        <div style="display: flex; justify-content: center;">
            <UpdateItemForm :item="objectToEdit" @update="refreshList(); closeModal()" />
        </div>
    </Modal>
</template>