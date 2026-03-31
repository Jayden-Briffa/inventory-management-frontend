<script setup> 
import { computed } from 'vue' 
const props = defineProps({ 
    bg: { 
        type: String, 
        default: "gray" 
    } 
})

const bgClass = computed(() => { 
    return { 
        gray: "bg-gray-100", 
        green: "bg-green-100",
    }[props.bg] }) 
    
</script>

<template>
    <div :class="[bgClass, 'p-6 rounded-lg shadow-md']"> 
        <slot /> 
    </div> 
</template>