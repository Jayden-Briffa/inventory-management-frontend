<script setup>
    import {ref} from "vue"
    const year = ref("2026")
</script>

<template>
    <footer>©{{year}}</footer>
</template>

<style>
    footer {
        text-align: center;
        width: 100%;
        background-color: red
    }
</style>