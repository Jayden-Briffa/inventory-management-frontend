<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-vf-red text-white">
    <nav class="flex justify-around">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/modal">Modal</RouterLink>
      <RouterLink to="/table">Table</RouterLink>
    </nav>
  </header>

  <div id="page-view">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  width: 100%;
  line-height: 1.5;
  max-height: 100vh;
  justify-self: left;
}
</style>
