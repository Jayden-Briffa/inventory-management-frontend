<template>
    <div class="search-bar">
        <input class="search-bar-input" type="text" id="searchBarInput" v-model="searchInput" @input="onUserInput" :placeholder="placeholder"/>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

withDefaults(defineProps<{
    placeholder?: string
}>(), {
    placeholder: '',
})

const searchInput = ref('')

const emit = defineEmits<{
    (e: 'update:input', value: string): void
}>()

function onUserInput(e: Event) {
        const target = e.target as HTMLInputElement | null
        searchInput.value = target?.value ?? ''
        emit('update:input', searchInput.value)
}

</script>

<style>

.search-bar {
    margin: 0.5em 0em;
}
.search-bar-input {
    padding: 0em 0.4em;
    background-color: rgb(215, 215, 215);
    outline-style: solid;
    outline-color: black;
    outline-width: 0.08em;
}
</style>