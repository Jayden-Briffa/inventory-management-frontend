<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';

const showModal = ref(false);
</script>

<template>
  <button class="bg-vf-red text-white px-4 py-2 rounded" @click="showModal = true">
    Show Modal
  </button>

  <Modal id="my-modal" title="My Modal!" v-model:show="showModal">
    <p>apples!</p>
  </Modal>

  
</template>