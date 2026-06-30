<script setup lang="ts">
    // Toast object added at App level
    import { useToastHelpers } from '@/helpers/toastHelpers'

    // Custom hook must be used to allow calling useToast from a centralised place
    const { 
        showInfo,
        showSuccess,
        showWarn,
        showError,
        showSecondary,
        showContrast
    } = useToastHelpers()

</script>

<template>
    <div class="flex flex-wrap justify-center gap-2">
        <Button severity="info" variant="outlined" @click="showInfo('There’s something you might want to check.')">Info</Button>
        <Button severity="success" variant="outlined" @click="showSuccess('Your changes have been saved.')">Success</Button>
        <Button severity="warn" variant="outlined" @click="showWarn('Some fields may need your attention.')">Warn</Button>
        <Button severity="danger" variant="outlined" @click="showError('We couldn’t complete the action. Please try again.')">Error</Button>
        <Button severity="secondary" variant="outlined" @click="showSecondary('This is a secondary toast message.')">Secondary</Button>
        <Button severity="contrast" variant="outlined" @click="showContrast('This is a contrast toast message.')">Contrast</Button>
    </div>    
</template>
