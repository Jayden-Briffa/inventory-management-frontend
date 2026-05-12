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
    console.log(`Editing item #${obj.id}`)
}

const delFunc = (obj) => {
    console.log(`Deleting..`)
}

const returnFunc = (obj) => {}

const handleToggleSelect = ({ obj, checked }) => {
    const objIdx = selectedObjects.value.findIndex(o => o.id === obj.id)

    if (checked && objIdx === -1) {
        selectedObjects.value.push(obj)
    } else if (!checked && objIdx !== -1) {
        selectedObjects.value.splice(objIdx, 1)
    }

    console.log(selectedObjects.value)
}
</script>

<template>
    <Table
        :data="data"
        :exclude-fields="['id']"
        :editFunc="editFunc"
        :delFunc="delFunc"
        :returnFunc="returnFunc"
        :selectedObjects="selectedObjects"
        @toggleSelect="handleToggleSelect"
    />
</template>