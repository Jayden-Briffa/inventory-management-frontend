<script setup>
import { reactive } from 'vue';

defineProps({
    id: String,
    title: String,
    show: Boolean,
})

const emit = defineEmits(['update:show'])
</script>
<!-- Enhance with transitions. We could use a <Transition /> block (which is a built-in component) -->
<template>
    <section v-if="show" :id class="modal-container">
      <div class="grid grid-cols-3">
        <button class="pi pi-times bg-vf-red w-8" @click="emit('update:show', false)"></button>
        <h3 class="text-center text-3xl">{{  title  }}</h3>
      </div>
      
      <slot />
    </section>
</template>

<style>
/* .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
} */
/* 
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
} */

.modal-container {
  --modal-width: 80vw;

  width: var(--modal-width);
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;

  position: absolute;
  top:10%;
  left:50%;
  transform: translate(-50%, 0);
  z-index: 999;
}
</style>