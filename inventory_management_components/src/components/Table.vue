<script setup lang="ts">
import { computed, ref, watch, nextTick, onUpdated } from 'vue';
import Loading from './Loading.vue';

const props = defineProps({
    id: String,
    data: Object,
    excludeFields: {
        type: Array,
        default: [],
    },
    selectedObjects: Array,
    editFunc: Function,
    delFunc: Function,
    returnFunc: Function,
})

const emit = defineEmits<{
  (e: 'toggleSelect', payload: { obj: any; checked: boolean }): void
}>()
let fields: string[] = []

const includedFields = computed(() =>
  fields.filter(key => !props.excludeFields.includes(key))
);

const numOptFuncs = computed(() =>
  [props.editFunc, props.delFunc, props.returnFunc].filter(Boolean).length
)

const gridTemplateColumns = computed(() => {
  const cols: string[] = []

  if (props.selectedObjects != null) {
    cols.push('minmax(3rem, auto)')
  }

  cols.push(...includedFields.value.map(() => '1fr'))

  if (numOptFuncs.value) {
    cols.push(`${numOptFuncs.value * 3}rem`)
  }

  return cols.join(' ')
})

watch(
  () => props.data,
  async (newData) => {
    console.log('Data found after update:', newData)
    if (newData != undefined) {
      fields = Object.keys(newData[0])
    }
  },
  { immediate: true, deep: true }
)

const totalColumns = computed(() => 
    includedFields.value.length +
    (numOptFuncs.value ? 1 : 0) + 
    (props.selectedObjects != null ? 1 : 0)
)

const isSelected = (obj: any) => {
    return props.selectedObjects?.some(o => o.id === obj.id)
}


// Dynamic cell truncation tracking
const cellRefs = ref<Record<string, HTMLElement>>({})

// On render, update cellRefs with a new key if the element is rendered
const setCellRef = (el: HTMLElement | null, rowKey: string | number, fieldKey: string) => {
    const refKey = `${rowKey}|${fieldKey}`

    if (!el) {
        delete cellRefs.value[refKey]
        return
    }

    cellRefs.value[refKey] = el
}

// Compare each cell's text and shown width, and apply 'raisable-cell' if it is truncated
const updateTruncation = () => {
    Object.values(cellRefs.value).forEach(el => {
        const truncated = el.scrollWidth > el.clientWidth // ? Should we just make all cells raisable by default? This avoids "unraisable truncation"
        el.classList.toggle('raisable-cell', truncated)
    })
}

// Wait for render to complete, then check for truncated cells
onUpdated(() => {
  updateTruncation();
});

</script>
<!-- Align field titles with values -->
<template>
    <section v-if="fields.length !== 0" :id class="bg-white">
        <div class="border border-vf-red grid" :style="{ gridTemplateColumns: gridTemplateColumns }">
            <p v-if="selectedObjects != null">Select</p>
            <p v-for="key of includedFields" 
            :key="`tableField${key}`" 
            class="truncate relative"
            :data-content="key"
            :ref="el => setCellRef(el, 'header', key)">{{ key }}</p>
            <p v-if="numOptFuncs">Options</p>
        </div>
        <div class="border border-vf-red">
            <div v-for="obj of data" :key="obj.id" class="grid" :style="{ gridTemplateColumns: gridTemplateColumns }" :class="isSelected(obj) ? 'selected-row' : ''">
                <input 
                    v-if="selectedObjects != null" 
                    type="checkbox" 
                    :checked="isSelected(obj)"
                    @change="emit('toggleSelect', { obj, checked: !isSelected(obj) })"
                />
                <!-- Row data -->
                <p
                  v-for="key of includedFields"
                  :key="`field-${key}`"
                  class="truncate relative"
                  :data-content="obj[key]"
                  :ref="el => setCellRef(el, obj.id, key)"
                >{{ obj[key] }}</p>
                <div v-if="numOptFuncs" class="opt-buttons">
                    <button v-if="editFunc" @click="editFunc(obj)">Edit</button>
                    <button v-if="delFunc" @click="delFunc(obj)">Del</button>
                    <button v-if="returnFunc" @click="returnFunc(obj)">Return</button>
                </div>
            </div>
        </div>
    </section>

    <Loading v-else />
</template>

<style>
.raisable-cell:hover {
    overflow: visible;
    text-overflow:ellipsis;
    max-width: 0;
}

.raisable-cell::after {
    box-shadow: 2px 2px 5px black;
    background-color: white;
    overflow: visible;
    display: block;
    content: attr(data-content);
    position: absolute;
    top: 0;
    z-index: 1;

    transition: all 0.2s;
    opacity: 0;
}

.raisable-cell:hover::after {
    opacity: 100;
}

.selected-row {
    background-color: #eeeeee;
}
</style>