<script setup>
import Table from '@/components/Table.vue';
import { reactive, onMounted, watch, ref } from 'vue';

const data = reactive({})
const selectedObjects = ref([])

onMounted(async () => {
    const response = await fetch(`/api/borrows`)
    data.value = response.data
})

const editFunc = (obj) => {console.log(`Editing item #${obj.id}`)}
const delFunc = (obj) => {console.log(`Deleting..`)}
const otherFunc = (obj) => {}

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
    <Table :data="data.value" exclude-fields="id" :editFunc :delFunc :selectedObjects="selectedObjects" @toggleSelect="handleToggleSelect" />
</template>