import { useToast } from 'primevue/usetoast';

export const useToastHelpers = () => {
const toast = useToast();

// TODO: Remove on tap
return {
    showInfo: message => {
        toast.add({ severity: 'info', summary: 'Heads up', detail: message, life: 3000 });
    },
    showSuccess: message => {
        toast.add({ severity: 'success', summary: 'Saved successfully', detail: message, life: 3000 });
    },
    showWarn: message => {
        toast.add({ severity: 'warn', summary: 'Check this', detail: message, life: 3000 });
    },
    showError: message => {
        toast.add({ severity: 'error', summary: 'Something went wrong', detail: message, life: 3000 });
    },
    showSecondary: message => {
        toast.add({ severity: 'secondary', summary: 'For your information', detail: message, life: 3000 });
    },
    showContrast: message => {
        toast.add({ severity: 'contrast', summary: 'High contrast', detail: message, life: 3000 });
    }
}}