<script setup lang="ts">
    import Toast from 'primevue/toast';
    import useToast from 'primevue/usetoast'

    const toast = useToast()

    const showInfo = () => {
        toast.add({ severity: 'info', summary: 'Heads up', detail: 'There’s something you might want to check.', life: 3000 });
    };
    const showSuccess = () => {
        toast.add({ severity: 'success', summary: 'Saved successfully', detail: 'Your changes have been saved.', life: 3000 });
    };
    const showWarn = () => {
        toast.add({ severity: 'warn', summary: 'Check this', detail: 'Some fields may need your attention.', life: 3000 });
    };
    const showError = () => {
        toast.add({ severity: 'error', summary: 'Something went wrong', detail: 'We couldn’t complete the action. Please try again.', life: 3000 });
    };
    const showSecondary = () => {
        toast.add({ severity: 'secondary', summary: 'For your information', detail: 'This is a secondary toast message.', life: 3000 });
    };
    const showContrast = () => {
        toast.add({ severity: 'contrast', summary: 'High contrast', detail: 'This is a contrast toast message.', life: 3000 });
    };
</script>

<template>
    <div class="flex flex-wrap justify-center gap-2">
        <Toast />
        <Button severity="info" variant="outlined" @click="showInfo">Info</Button>
        <Button severity="success" variant="outlined" @click="showSuccess">Success</Button>
        <Button severity="warn" variant="outlined" @click="showWarn">Warn</Button>
        <Button severity="danger" variant="outlined" @click="showError">Error</Button>
        <Button severity="secondary" variant="outlined" @click="showSecondary">Secondary</Button>
        <Button severity="contrast" variant="outlined" @click="showContrast">Contrast</Button>
    </div>    
</template>
