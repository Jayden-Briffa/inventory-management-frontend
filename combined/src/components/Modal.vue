<script setup lang="ts">
import { Transition } from 'vue';

withDefaults(defineProps<{
  id?: string
  title?: string
  show?: boolean
}>(), {
  show: false,
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()
</script>

<template>


  <Transition>
    <div v-if="show" class="modal-overlay" @click="emit('update:show', false)">
    <section v-if="show" :id class="modal-container" @click.stop>
        <div class="grid grid-cols-3 modal-header">
          <button class="pi pi-times w-8" @click="emit('update:show', false)"></button>
          <h3 class="modal-title">{{  title  }}</h3>
        </div>
        
        <slot />
      </section>
        </div>
  </Transition>


</template>

<style>

/* Modal styling */

.modal-container {
  --modal-width: 40vw;

  width: var(--modal-width);
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  
  /* Keeps modal centered in middle of page */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-title {
  text-align: center;
  font-size: x-large;
  font-weight: 600;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;

  display: flex;
  justify-content: center;
  align-items: center

}

/* Transition styling */

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>