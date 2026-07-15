<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Modal from '@/components/Modal.vue'
import QrScanner from '@/components/QrScanner.vue'
import QrBorrow from '@/components/QrBorrow.vue'

const route = useRoute()

const email = computed(() => {
  const value = route.query.email
  if (typeof value !== 'string') return ''
  return value.trim()
})

const isQrModalVisible = ref(false)
const isQrScannerVisible = ref(true)
const confirmedQrCode = ref('')

const onConfirmQrCode = (qrCode: string) => {
  confirmedQrCode.value = qrCode
  isQrScannerVisible.value = false
}
</script>

<template>
  <main class="borrow-page">
    <h1>Borrow</h1>

    <div v-if="email" class="borrow-content">
      <p>Borrowing as: {{ email }}</p>

      <button
        class="btn"
        type="button"
        @click="
          isQrModalVisible = true
          isQrScannerVisible = true
        "
      >
        Open QR Scanner
      </button>

      <Modal
        id="borrow-qr-scanner-modal"
        title="QR Code Scanner"
        :show="isQrModalVisible"
        @update:show="isQrModalVisible = $event"
      >
        <QrScanner v-if="isQrScannerVisible" @confirm-qr-code="onConfirmQrCode" />
        <QrBorrow
          v-if="!isQrScannerVisible"
          :item-u-u-i-d="confirmedQrCode"
          :user-email="email"
          @scan-again="isQrScannerVisible = true"
        />
      </Modal>
    </div>

    <p v-else>Please go back and enter an email.</p>
  </main>
</template>

<style scoped>
.borrow-page {
  display: grid;
  gap: 1rem;
}

.borrow-content {
  display: grid;
  gap: 0.8rem;
}

.btn {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--color-border, #d7d7d7);
  background: var(--color-background-mute, #ebebeb);
  color: var(--color-text, #1f2937);
  cursor: pointer;
}

.btn:hover {
  background: var(--color-background-soft, #f3f3f3);
}
</style>