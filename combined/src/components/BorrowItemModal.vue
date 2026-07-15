<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import { computed } from 'vue';

type BorrowableItem = {
    name: string
    description: string
}

const props = defineProps<{
    item?: BorrowableItem,
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
    <Modal v-if="item" id="borrow-item-modal" :title="`Borrow item: ${item.name}`" v-model:show="show">
        <div class="mt-4" />

        <div class="flex flex-col items-center w-1/2 justify-self-center">
            <p>{{ item.description }}</p>
            
            <form class="self-center mt-3 p-2 border border-vf-red rounded" id="user-borrow-form">
                <div class="justify-items-center m-4">
                    <label id="expected-return-input" class="block font-bold mb-1 text-2xl">Expected Return Date: </label>
                    <input type="date" class="bg-gray-200 border border-vf-grey rounded font-bold block p-4 text-2xl" id="expected-return-input">
                </div>
                
                <button @click="(event) => {emit('borrow-item'); event.preventDefault()}" class="block bg-vf-red w-full">Borrow</button>
            </form>
        </div>
    </Modal>
</template>