<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  margin: 0 auto;
  padding: 1rem 1rem 1.5rem;
  max-width: 1100px;
}

.app-main {
  padding-top: 0.5rem;
}
</style>
