<template>
    <div class="search-bar">
        <input class="search-bar-input" type="text" id="searchBarInput" v-model="searchInput" @input="onUserInput" :placeholder="placeholder"/>
    </div>
</template>

<script setup>

import { ref } from 'vue';

const props = defineProps({
    placeholder: String
})

const searchInput = ref("")

const emit = defineEmits(['update:input'])

function onUserInput(e) {
    searchInput.value = e.target.value;
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