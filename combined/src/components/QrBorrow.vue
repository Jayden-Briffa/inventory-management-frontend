<template>
  <div>
    <h2>{{ item?.name }}</h2>

    <h3>Description</h3>
    <p>
      {{ item?.description }}
    </p>

    <div v-if="isItemAvailable">
      <h4>Expected Return Date:</h4>
      <!-- Clientside Validation: Prevent borrowing on or before today's date by setting the min attribute to today's date -->
      <input type="date" v-model="expectedReturnDate" :min="minReturnDate" />
      <button @click="borrowItem">Borrow Item</button>
    </div>

    <div v-else>
      <div v-if="isBorrowSuccessful">
        <p>Item borrowed successfully!</p>
      </div>
      <p v-else>This item is currently borrowed and not available.</p>
    </div> 
    <button @click="emit('scanAgain')">Scan Again</button>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Item } from '@/services/inventory'
import { fetchItemByUUID, createBorrow } from '@/services/inventory'

const props = defineProps<{
  itemUUID?: string
  userEmail?: string
}>()

const emit = defineEmits<{
  (e: 'scanAgain'): void
}>()

const item = ref<Item | null>(null)
const expectedReturnDate = ref<string | null>(null)

const minReturnDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const year = tomorrow.getFullYear()
  // +1 because getMonth() returns 0-11 for Jan-Dec, and padStart to ensure two digits
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
  const day = String(tomorrow.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
})

const isItemAvailable = computed(() => {
  if (!item.value) return false
  if (item.value.isCollection) return true
  const borrows = item.value.borrows ?? []
  return !borrows.some((borrow) => !borrow.isReturned)
})

const isBorrowSuccessful = ref(false)

const borrowItem = () => {
  if (!item.value || !props.userEmail
  ) {
    alert('Missing information to borrow item.')
    return
  }
  createBorrow(item.value?.itemId, props.userEmail, expectedReturnDate.value)
    .then(() => {
      isBorrowSuccessful.value = true
      item.value = null
      expectedReturnDate.value = null
    })
    .catch((error) => {
      console.error('Error borrowing item:', error)
      alert('Failed to borrow item. Please try again.')
    })

}

watch(() => props.itemUUID, (newItemUUID) => {
  console.log('Received itemUUID in QrBorrow component:', newItemUUID)
  if (!newItemUUID) return

  fetchItemByUUID(newItemUUID)
    .then((fetchedItem) => {
      console.log('Fetched item details:', fetchedItem)
      item.value = fetchedItem
    })
    .catch((error) => {
      console.error('Error fetching item details:', error)
    })
}, { immediate: true })

</script>