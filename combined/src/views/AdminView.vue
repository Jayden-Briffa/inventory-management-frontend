<script setup lang="ts">
import { ref } from 'vue'
import ItemsTable from '@/components/ItemsTable.vue'
import BorrowsTable from '@/components/BorrowsTable.vue'

const selectedTable = ref<'borrows' | 'items'>('borrows')
</script>

<template>
  <main>
    <div class="table-toggle">
      <span>
        <button
          class="toggle-button"
          :class="{ active: selectedTable === 'borrows' }"
          @click="selectedTable = 'borrows'"
        >
          Borrows
        </button>
        <button
          class="toggle-button"
          :class="{ active: selectedTable === 'items' }"
          @click="selectedTable = 'items'"
        >
          Items
        </button>
      </span>
    </div>

    <BorrowsTable v-if="selectedTable === 'borrows'" />
    <ItemsTable v-if="selectedTable === 'items'" />
  </main>
</template>

<style scoped>
.table-toggle {
  display: flex;
  justify-content: center;
  padding: 1.2em;
}

.toggle-button {
  padding: 0.2em 5em;
  margin: 1.2em;
  font-weight: 400;
  border-radius: 0;
  outline-style: solid;
  outline-color: var(--color-vf-red, #e60000);
}

.active {
  background-color: var(--color-vf-red, #e60000);
  color: #ffffff;
}
</style>