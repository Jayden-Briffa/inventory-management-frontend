<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import { computed } from 'vue';

const props = defineProps<{
    item: object,
    show: boolean
}>()
const emit = defineEmits<{ 
    (e: 'update:show', value: boolean): void
    (e: 'borrow-item'): void
}>()

// Propogates the update:show event to parent
const show = computed<boolean>({
  get: () => !!props.show,
  set: (v: boolean) => emit('update:show', v)
})

</script>

<template>
    <Modal id="borrow-item-modal" title="Borrow Item" v-model:show="show">
        <p>{{ item.description }}</p>
        <input type="date">

        <button @click=emit("borrow-item")>Borrow</button>
    </Modal>
</template>