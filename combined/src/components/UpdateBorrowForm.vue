<template>
    <div id="updateBorrow" class="update-form">
        <p>Borrower email: <input v-model="form.borrowEmail"></p>
        <p>Borrow date: <input type="datetime-local" v-model="form.borrowDate"></p>
        <p>Expected return date: <input type="date" v-model="form.expectedReturnDate"></p>
        <p>Has this borrow been returned?: 
            <input type="checkbox" id="checkbox" v-model="form.borrowIsReturned" />
        </p>
        <div style="display: flex; justify-content: center;"><button class="form-button" @click="updateBorrowFromForm">Update</button></div>
    </div>
</template>


<script setup>
// Should create standalone 'form' component from which to create borrow/item variants

import { updateBorrow } from '@/apis/borrowMethods.js';
import { reactive, watch } from 'vue';

const emit = defineEmits(['update'])

const props = defineProps({
    borrow: Object,
})

const form = reactive({
    borrowEmail: '',
    borrowDate: '',
    expectedReturnDate: '',
    borrowIsReturned: true
})

const updateBorrowFromForm = async () => {
    let borrowDetails = {email: form.borrowEmail, borrowDate: form.borrowDate, expectedReturnDate: form.expectedReturnDate, isReturned: form.borrowIsReturned};
    try {
      await updateBorrow(props.borrow.borrowId, borrowDetails)
      emit('update')
    }
    catch(error) {
      console.error(error)
    };
}

watch (
  () => props.borrow,
  (newBorrow) => {
    if (newBorrow) {
      form.borrowEmail = newBorrow.email
      form.borrowDate = newBorrow.borrowDate.slice(0,16) // Sliced to proper format for datetime-local input (removed seconds & microseconds). This also means borrows whose borrowDates have been updated will no longer specify to seconds/microseconds
      form.expectedReturnDate = newBorrow.expectedReturnDate
      form.borrowIsReturned = newBorrow.isReturned
    }
  },
  { immediate: true } 
)


</script>
