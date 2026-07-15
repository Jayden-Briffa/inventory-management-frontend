<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Table from '@/components/Table.vue'
import QrScanner from '@/components/QrScanner.vue'
import type { Borrow, Item } from '@/services/inventory'
import { fetchItems } from '@/services/inventory'
import Modal from '@/components/Modal.vue'
import QrBorrow from '@/components/QrBorrow.vue'

const inventoryApiEnabled = import.meta.env.VITE_INVENTORY_API_ENABLED === 'true'

const router = useRouter()
const email = ref('')

// Seed data keeps homepage interactions available when the API is not configured.
const items = ref<Item[]>([
  {
    itemId: 1,
    qrCode: 'DUMMY-QR-001',
    name: 'Sample Item',
    description: 'Seed data until the API is available.',
    borrows: [
      {
        borrowId: 1,
        itemId: 1,
        email: 'george.bartram@example.com',
        borrowDate: new Date().toISOString(),
        isReturned: false,
      },
      {
        borrowId: 2,
        itemId: 1,
        email: 'yara.niroukh@example.com',
        borrowDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isReturned: true,
      },
      {
        borrowId: 3,
        itemId: 1,
        email: 'jayden.briffa@example.com',
        borrowDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        isReturned: true,
      },
      {
        borrowId: 4,
        itemId: 1,
        email: 'raymond.guo@example.com',
        borrowDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        isReturned: false,
      },
    ],
  },
])

const borrows = computed<Borrow[]>(() => items.value.flatMap((item) => item.borrows ?? []))

const recentBorrows = computed<Borrow[]>(() => {
  const sorted = [...borrows.value].sort((a, b) => {
    const aTime = a.borrowDate ? Date.parse(a.borrowDate) : 0
    const bTime = b.borrowDate ? Date.parse(b.borrowDate) : 0
    return bTime - aTime
  })

  const results: Borrow[] = []
  const seen = new Set<string>()

  for (const borrow of sorted) {
    const userEmail = borrow.email
    if (!userEmail) continue

    const key = userEmail.trim().toLowerCase()
    if (!key || seen.has(key)) continue

    seen.add(key)
    results.push(borrow)
  }

  return results
})

const emailSuggestions = computed<string[]>(() => {
  const query = email.value.trim().toLowerCase()
  if (query.length < 2) return []

  const results: string[] = []
  const seen = new Set<string>()

  for (const borrow of recentBorrows.value) {
    const userEmail = borrow.email
    if (!userEmail || !userEmail.toLowerCase().includes(query)) continue

    const key = userEmail.toLowerCase()
    if (seen.has(key)) continue

    seen.add(key)
    results.push(userEmail)

    if (results.length >= 8) break
  }

  return results
})

onMounted(async () => {
  if (!inventoryApiEnabled) return

  try {
    const fetchedItems = await fetchItems()
    if (fetchedItems.length) {
      items.value = fetchedItems
    }
  } catch {
    // Keep seeded data if the endpoint is unavailable.
  }
})

const confirmEmail = () => {
  const normalizedEmail = email.value.trim()
  if (!normalizedEmail) return

  void router.push({ name: 'borrow', query: { email: normalizedEmail } })
}

const goToBorrowForEmail = (selectedBorrow: Record<string, unknown>) => {
  const selectedEmail = selectedBorrow.email
  const normalizedEmail = typeof selectedEmail === 'string' ? selectedEmail.trim() : ''
  if (!normalizedEmail) return

  void router.push({ name: 'borrow', query: { email: normalizedEmail } })
}

const isQrModalVisible = ref(false)
const isQrScannerVisible = ref(true)
const confirmedQrCode = ref('')

const onConfirmQrCode = (qrCode: string) => {
  confirmedQrCode.value = qrCode
  isQrScannerVisible.value = false
}
</script>

<template>
  <main class="home">
    <section class="hero">
      <h1 id="home-title" data-testid="home-title">Welcome to Inventory Management</h1>

      <div class="form">
        <input
          v-model="email"
          class="input"
          type="email"
          inputmode="email"
          autocomplete="email"
          list="email-suggestions"
          placeholder="Enter email"
        />
        <datalist id="email-suggestions">
          <option v-for="suggestion in emailSuggestions" :key="suggestion" :value="suggestion" />
        </datalist>
        <button class="btn" type="button" @click="confirmEmail">Continue</button>
      </div>
    </section>

    <section>
      <h2 class="section-title">Recent Borrowers</h2>
      <Table
        :data="recentBorrows"
        :exclude-fields="['borrowId', 'itemId', 'borrowDate', 'expectedReturnDate', 'isReturned']"
        :enable-headings="false"
        row-key="borrowId"
        @click="goToBorrowForEmail"
      />
    </section>

    <section class="qr-section">
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
    </section>

    <Modal
      id="qr-scanner-modal"
      title="QR Code Scanner"
      :show="isQrModalVisible"
      @update:show="isQrModalVisible = $event"
    >
      <QrScanner v-if="isQrScannerVisible" @confirm-qr-code="onConfirmQrCode" />
      <QrBorrow
        v-if="!isQrScannerVisible"
        :itemUUID="confirmedQrCode"
        @scan-again="isQrScannerVisible = true"
      />
    </Modal>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero {
  padding: 1.25rem;
  border: 1px solid var(--color-border, #d7d7d7);
  background: var(--color-background-soft, #f7f7f7);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 2rem;
  line-height: 1.15;
  font-weight: 650;
  color: var(--color-heading, #111827);
}

.form {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 700px;
}

.input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  border: 1px solid var(--color-border, #d7d7d7);
  background: var(--color-background, #ffffff);
  color: var(--color-text, #1f2937);
}

.section-title {
  margin-bottom: 0.6rem;
  font-weight: 600;
}

.btn {
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

.qr-section {
  display: flex;
}

@media (min-width: 900px) {
  h1 {
    font-size: 2.4rem;
  }

  .hero {
    padding: 1.75rem;
  }
}
</style>