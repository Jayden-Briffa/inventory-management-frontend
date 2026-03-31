<script setup>
import Table from '@/components/Table.vue';
import axios from 'axios';
import { reactive, onMounted } from 'vue';

const data = reactive({})
onMounted(async () => {
    const response = await axios.get(`/api/borrows`)
    data.value = response.data
    console.log("Data found in json:", data.value)
})

</script>

<template>
    <Table :data="data.value" exclude-fields="id" />
</template>