<!-- https://primevue.org/toast -->

<script lang="ts">
import Toast from 'primevue/toast';
const toast = useToast();

// Define functions to reduce duplication/complexity. Maybe move to a seperate file/folder for widespread usage?
const showSuccess = (message: string) => {
    toast.add({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
};

const showError = (message: string) => {
    toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
};
</script>

<template>
    <!-- Define toast notification container -->
    <!-- Can this be in the base page? -->
    <Toast position="top-right" /> 

    <!-- Apply toast notification to button -->
    <button @click="showSuccess('Operation successful')">Show Success</button>
    <button @click="showError('Operation failed')">Show Error</button>
</template>