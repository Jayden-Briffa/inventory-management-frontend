<script setup>
import Table from '@/components/Table.vue';
import { ref, onMounted } from 'vue';

const data = ref([])
const selectedObjects = ref([])

onMounted(async () => {
    const response = await fetch('/api/borrows')
    data.value = await response.json()
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
</script>

<template>
    <h1> Full table </h1>
    <Table
        id="fullDataTable"
        :data="data"
        :exclude-fields="['id']"
        :editFunc="editFunc"
        :delFunc="delFunc"
        :returnFunc="returnFunc"
        :selectFunc="selectFunc"
    />
    
    <hr>
    <h1> Email only table </h1>
    <Table
        id="emailOnlyTable"
        :data="data"
        :include-fields="['Borrowed_by']"
        :fieldAliases="{'Borrowed_by': 'Email'}"
    />
</template>