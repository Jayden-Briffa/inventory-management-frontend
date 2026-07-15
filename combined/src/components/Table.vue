<script setup lang="ts">
import { computed } from 'vue';
import Loading from './Loading.vue';

const props = defineProps({
    id: String,
    data: {
      type: Array,
      default: () => []
    },
    excludeFields: {
      type: Array,
      default: () => [],
    },
    selectedObjects: Array,
    editFunc: Function,
    delFunc: Function,
    otherFunc: Function,
    enableHeadings: {
        type: Boolean,
        default: true,
    },
    formatters: {
      type: Object as () => Record<string, (value: any) => string>,
      default: () => ({})
    },
    fieldLabels: {
      type: Object as () => Record<string, string>,
      default: () => ({})
    },
    rowKey: { // Unique identifier for each row: currently either borrowId or itemId
      type: String,
      default: 'id'
    }

})

const formatValue = (key: string, value: any) => {
  // Applies presentation-layer formatting to data values (e.g. borrowDate)
  const formatter = props.formatters?.[key]
  return formatter ? formatter(value) : value
}

const getLabel = (key: string) => {
  // Applies presentation-layer formatting to attributes as table columns
  return props.fieldLabels?.[key] || key
}


const emit = defineEmits<{
  (e: 'toggleSelect', payload: { obj: any; checked: boolean }): void
  (e: 'click', data: object): void

}>()

const fields = computed(() => {
  if (Array.isArray(props.data) && props.data.length > 0) {
    return Object.keys(props.data[0])
  }

  return Object.keys(props.fieldLabels ?? {})
})


const onClick = (data: object) => {
  emit('click', data)
}

const gridTemplateColumns = computed(() => {
  const cols = []

  if (props.selectedObjects != null) {
    cols.push('minmax(3rem, auto)')
  }

  cols.push(...includedFields.value.map(() => '1fr'))

  if (optFuncsIncluded) {
    cols.push('minmax(5rem, auto)')
  }

  return cols.join(' ')
})

// A change in props does not trigger onBeforeUpdated
// watch(() => props.data, () => {
//     console.log("Data found after update:", props.data)
//     if (props.data != undefined){
//         fields = Object.keys(props.data[0])
//     }
// })

// const includedFields = computed(() =>
//   fields.filter(key => !props.excludeFields.includes(key))
// );
const includedFields = computed(() =>
  fields.value.filter(key => !props.excludeFields.includes(key))
)


const optFuncsIncluded = props.editFunc || props.delFunc || props.otherFunc

const totalColumns = computed(() =>
    includedFields.value.length +
    (optFuncsIncluded ? 1 : 0) +
    (props.selectedObjects != null ? 1 : 0)
)

const isSelected = (obj: any) => {
    // console.log("Selected objects:", props.selectedObjects, props.selectedObjects?.some(o => o.id === obj.id))
    const key = props.rowKey
    const objIsSelected = props.selectedObjects?.some(o => o[key] === obj[key]) //itemId or borrowId
    return objIsSelected
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
            <div v-for="obj of data" :key="`tableRows${obj.id}`" class="grid table-element" :style="{ gridTemplateColumns: gridTemplateColumns }" style="align-items: center;" @click="onClick(obj)">
                <input
                    v-if="selectedObjects != null"
                    type="checkbox"
                    :checked="isSelected(obj)"
                    @change="emit('toggleSelect', { obj, checked: !isSelected(obj) })"
                />
                <p v-for="key of includedFields" :key>{{ formatValue(key, obj[key]) }}</p>
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
