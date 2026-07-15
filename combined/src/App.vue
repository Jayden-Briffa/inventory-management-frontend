<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <RouterLink class="brand" to="/">Inventory Management</RouterLink>

      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/borrow">Borrow</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  margin: 0 auto;
  padding: 0 1rem 1.5rem;
  max-width: 1100px;
}

.app-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--color-border, #d7d7d7);
}

.brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--color-heading, #1f2937);
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 0.5rem;
}

.nav a {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.65rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--color-text, #1f2937);
}

.nav a.router-link-exact-active {
  background: var(--color-background-mute, #ececec);
}

.nav a:hover {
  background: var(--color-background-soft, #f3f3f3);
}

.app-main {
  padding-top: 1rem;
}
</style>
