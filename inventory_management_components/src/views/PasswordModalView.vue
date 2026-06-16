<script setup lang="ts">
import PasswordModal from '@/components/PasswordModal.vue';
import { ref } from 'vue';

const show = ref(true)
function enterHandler(enteredCode: string){
  console.log(enteredCode)
  show.value = false
}
</script>

<template>
  <button class="bg-vf-red text-white px-4 py-2 rounded" @click="show = true">
    Show Modal
  </button>
  
  <PasswordModal v-model:show="show" :enterHandler="enterHandler" />
</template>