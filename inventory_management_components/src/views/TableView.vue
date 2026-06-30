<script setup>
import BorrowItemModal from '@/components/BorrowItemModal.vue';
import Table from '@/components/Table.vue';
import { ref, onMounted } from 'vue';

const borrowData = ref([])
const itemData = ref([])
const selectedObjects = ref([])
const showBorrowItemModal = ref(false)

onMounted(async () => {
    let response = await fetch('/api/borrows')
    borrowData.value = await response.json()
    
    response = await fetch('/api/items')
    itemData.value = await response.json()
    console.log("ITEMS:", itemData.value) 
})

const editFunc = (obj) => {
    console.log(`Editing item #${obj.id}...`)
}

const delFunc = (obj) => {
    console.log(`Deleting item #${obj.id}...`)
}

const returnFunc = (obj) => {
    console.log(`Returning item #${obj.id}...`)
}

const selectFunc = (newSelectedObjects) => {
    selectedObjects.value = newSelectedObjects
    console.log("Selected objects:", selectedObjects.value)
}

const clickRow = (row) => {
    console.log("Row clicked:", row)
}

</script>

<template>
    <button class="bg-vf-red text-white px-4 py-2 rounded" @click="showBorrowItemModal = true">
        Show Borrow Item Modal
    </button>
    <BorrowItemModal :v-if="itemData[0] != undefined" :item="itemData[0]" v-model:show="showBorrowItemModal" />

    <h1> Full table </h1>
    <Table
        id="fullDataTable"
        :data="borrowData"
        :exclude-fields="['id']"
        :editFunc="editFunc"
        :delFunc="delFunc"
        :returnFunc="returnFunc"
        :selectFunc="selectFunc"
        @clickRow="clickRow"
    />
    
    <hr>
    <h1> Email only table </h1>
    <Table
        id="emailOnlyTable"
        :data="borrowData"
        :include-fields="['Borrowed_by']"
        :fieldAliases="{'Borrowed_by': 'Email'}"
        hideFields
    />
</template>