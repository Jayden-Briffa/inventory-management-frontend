<script setup lang="ts">
import Modal from '@/components/Modal.vue';
import { ref, computed } from 'vue';

const props = defineProps<{
  enterHandler: (enteredCode: string) => void;
  show: boolean;
}>()

const emit = defineEmits<{ (e: 'update:show', value: boolean): void }>()

// Propogates the update:show event to parent
const show = computed<boolean>({
  get: () => !!props.show,
  set: (v: boolean) => emit('update:show', v)
})

const PLACEHOLDER_TEXT = "123..."
const codeIsEmpty = ref(true);
const enteredCode = ref(PLACEHOLDER_TEXT);

function appendDigit(digit: number){
  if (codeIsEmpty.value){
      enteredCode.value = ""
      codeIsEmpty.value = false
  }
  
  enteredCode.value += digit.toString()
}

function resetCode(){
    codeIsEmpty.value = true
    enteredCode.value = PLACEHOLDER_TEXT
}

function popDigit(){
    enteredCode.value = enteredCode.value.slice(0, -1)
    
    if (enteredCode.value.length === 0 || codeIsEmpty.value){
      resetCode()
    }
}

function processEnteredCode(): string {
    const processedCode = codeIsEmpty.value ? '' : enteredCode.value
    resetCode()

    return processedCode
}
</script>

<template>
  <Modal id="my-modal" title="My Modal!" v-model:show="show">
    <div class="text-center">{{ enteredCode }}</div>
    <div class="grid grid-cols-3 justify-self-center justify-items-center gap-1 grid-flow-row-dense" id="keypad">
      <button :class="`bg-vf-grey p-5 aspect-square text-white h-vh order-1 text-2xl grid-col-1`" @click="popDigit()">Delete</button>
      <button :class="`bg-vf-grey p-5 aspect-square text-white h-vh -order-0 text-2xl grid-col-3`" @click="enterHandler(processEnteredCode())">Enter</button>
      <button v-for="i in 10" :class="`bg-vf-grey p-5 aspect-square text-white h-vh -order-${i} text-4xl ${i==1 ? 'grid-col-2': ''}`" @click="appendDigit(i-1)">{{ i-1 }}</button>
    </div>
  </Modal>

<!-- Declare dynamic classes
"-order-0"
"-order-1"
"-order-2"
"-order-3"
"-order-4"
"-order-5"
"-order-6"
"-order-7"
"-order-8"
"-order-9"
"-order-10"
-->

</template>


<style>
  .h-vh{
    height: 15vh;
  }

  .w-2h-m{
    width: calc(15vh * 2 + var(--spacing) * 1)
  }

  .grid-col-1{
    grid-column: 1
  }

  .grid-col-2{
    grid-column: 2
  }

  .grid-col-3{
    grid-column: 3
  }
  

</style>