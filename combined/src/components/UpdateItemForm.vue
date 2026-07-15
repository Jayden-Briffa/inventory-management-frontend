<template>
    <div id="updateItem" class="update-form">
        <p>QR code: <input v-model="form.qrCode" disabled></p>
        <p>Item name: <input v-model="form.itemName"></p>
        <p>Item description: <input v-model="form.itemDescription"></p>
        <p>Is the item part of a collection?: 
            <input type="checkbox" id="checkbox" v-model="form.itemIsCollection" />
        </p>
        <div style="display: flex; justify-content: center;"><button class="form-button" @click="updateItemFromForm">Update</button></div>
    </div>
</template>


<script setup lang="ts">
// Should create standalone 'form' component from which to create borrow/item variants

import { updateItem } from '@/apis/itemMethods.js';
import { reactive, watch } from 'vue';

type ItemUpdateInput = {
  qrCode: string
  name: string
  description: string
  isCollection: boolean
}

const emit = defineEmits<{
  (e: 'update'): void
}>()

const props = defineProps<{
  item?: Partial<ItemUpdateInput>
}>()

const form = reactive({
    qrCode: '',
    itemName: '',
    itemDescription: '',
    itemIsCollection: true
})

const updateItemFromForm = async () => {
    if (!form.qrCode) {
      return
    }

    const itemDetails = {name: form.itemName, description: form.itemDescription, isCollection: form.itemIsCollection};
    try {
      await updateItem(form.qrCode, itemDetails)
      emit('update')
    }
    catch(error) {
      console.error(error)
    };
}

watch (
  () => props.item,
  (newItem?: Partial<ItemUpdateInput>) => {
    if (newItem) {
      form.qrCode = newItem.qrCode ?? ''
      form.itemName = newItem.name ?? ''
      form.itemDescription = newItem.description ?? ''
      form.itemIsCollection = newItem.isCollection ?? false
    }
  },
  { immediate: true } 
)


</script>
