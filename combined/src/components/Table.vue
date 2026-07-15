<script setup lang="ts">
import { computed } from 'vue';
import Loading from './Loading.vue';

type TableRow = Record<string, unknown>
type RowAction = (row: TableRow) => void

const props = withDefaults(defineProps<{
  id?: string
  data?: TableRow[]
  excludeFields?: string[]
  selectedObjects?: TableRow[]
  editFunc?: RowAction
  delFunc?: RowAction
  otherFunc?: RowAction
  enableHeadings?: boolean
  formatters?: Record<string, (value: unknown) => string | number>
  fieldLabels?: Record<string, string>
  rowKey?: string
}>(), {
  data: () => [],
  excludeFields: () => [],
  enableHeadings: true,
  formatters: () => ({}),
  fieldLabels: () => ({}),
  rowKey: 'id',
})

const formatValue = (key: string, value: unknown) => {
  // Applies presentation-layer formatting to data values (e.g. borrowDate)
  const formatter = props.formatters?.[key]
  return formatter ? formatter(value) : value
}

const getLabel = (key: string) => {
  // Applies presentation-layer formatting to attributes as table columns
  return props.fieldLabels?.[key] || key
}


const emit = defineEmits<{
  (e: 'toggleSelect', payload: { obj: TableRow; checked: boolean }): void
  (e: 'click', data: TableRow): void

}>()

const fields = computed<string[]>(() => {
  if (props.data.length > 0) {
    return Object.keys(props.data[0])
  }

  return Object.keys(props.fieldLabels ?? {})
})


const onClick = (data: TableRow) => {
  emit('click', data)
}

const gridTemplateColumns = computed(() => {
  const cols: string[] = []

  if (props.selectedObjects != null) {
    cols.push('minmax(3rem, auto)')
  }

  cols.push(...includedFields.value.map(() => '1fr'))

  if (optFuncsIncluded.value) {
    cols.push('minmax(5rem, auto)')
  }

  return cols.join(' ')
})

const includedFields = computed(() =>
  fields.value.filter(key => !props.excludeFields.includes(key))
)

const optFuncsIncluded = computed(() => Boolean(props.editFunc || props.delFunc || props.otherFunc))

const totalColumns = computed(() =>
    includedFields.value.length +
  (optFuncsIncluded.value ? 1 : 0) +
    (props.selectedObjects != null ? 1 : 0)
)

const isSelected = (obj: TableRow): boolean => {
    const key = props.rowKey
  return props.selectedObjects?.some(o => o[key] === obj[key]) ?? false
}
</script>

<template>
    <section v-if="fields.length !== 0" :id>
        <div class="border border-vf-red grid table-headers" :style="{ gridTemplateColumns: gridTemplateColumns }">
            <p v-if="selectedObjects != null" ></p>
              <p v-if="enableHeadings" v-for="key of includedFields" :key="`tableField${key}`">{{ getLabel(key) }}</p>
          <p v-if="optFuncsIncluded"></p>
        </div>
        <div class="border border-vf-red">
          <div v-for="obj of data" :key="`tableRows${obj[rowKey]}`" class="grid table-element" :style="{ gridTemplateColumns: gridTemplateColumns }" style="align-items: center;" @click="onClick(obj)">
                <input
                    v-if="selectedObjects != null"
                    type="checkbox"
                    :checked="isSelected(obj)"
                    @change="emit('toggleSelect', { obj, checked: !isSelected(obj) })"
                />
            <p v-for="key of includedFields" :key="`tableField-${String(obj[rowKey])}-${key}`">{{ formatValue(key, obj[key]) }}</p>
            <div v-if="optFuncsIncluded" class="opt-buttons">
                    <button v-if="editFunc" @click="editFunc(obj)"><i class="pi pi-pen-to-square"></i></button>
                    <button v-if="delFunc" @click="delFunc(obj)"><i class="pi pi-trash"></i></button>
                    <button v-if="otherFunc" @click="otherFunc(obj)">Other</button>
                </div>
            </div>
        </div>
    </section>

    <Loading v-else />
</template>

<style>

.opt-buttons i {
  font-size: x-large;
}

.table-element:hover {
  background-color: var(--color-background-mute);
}

.table-headers {
  background-color: var(--color-background-mute);
  border-bottom: 0;
}

.table-headers > p {
  font-weight: 700;
}

</style>
