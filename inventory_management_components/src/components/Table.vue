<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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
    otherFunc: Function,
})

const emit = defineEmits<{
  (e: 'toggleSelect', payload: { obj: any; checked: boolean }): void
}>()
let fields: string[] = []

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
watch(() => props.data, () => {
    console.log("Data found after update:", props.data)
    if (props.data != undefined){
        fields = Object.keys(props.data[0])
    }
})

const includedFields = computed(() =>
  fields.filter(key => !props.excludeFields.includes(key))
);

const optFuncsIncluded = props.editFunc || props.delFunc || props.otherFunc

const totalColumns = computed(() => 
    includedFields.value.length +
    (optFuncsIncluded ? 1 : 0) + 
    (props.selectedObjects != null ? 1 : 0)
)

const isSelected = (obj: any) => {
    // console.log("Selected objects:", props.selectedObjects, props.selectedObjects?.some(o => o.id === obj.id))
    const objIsSelected = props.selectedObjects?.some(o => o.id === obj.id)
    return objIsSelected
}
</script>
<!-- Align field titles with values -->
<template>
    <section v-if="fields.length !== 0" :id>
        <div class="border border-vf-red grid" :style="{ gridTemplateColumns: gridTemplateColumns }"`>
            <p v-if="selectedObjects != null" >Select</p>
            <p v-for="key of includedFields" :key="`tableField${key}`">{{ key }}</p>
            <p v-if="optFuncsIncluded">Options</p>
        </div>
        <div class="border border-vf-red">
            <div v-for="obj of data" :key="`tableRows${obj.id}`" class="grid" :style="{ gridTemplateColumns: gridTemplateColumns }"`>
                <input 
                    v-if="selectedObjects != null" 
                    type="checkbox" 
                    :checked="isSelected(obj)"
                    @change="emit('toggleSelect', { obj, checked: !isSelected(obj) })"
                />
                <p v-for="key of includedFields" :key>{{ obj[key] }}</p>
                <div v-if="optFuncsIncluded" class="opt-buttons">
                    <button v-if="editFunc" @click="editFunc(obj)">Edit</button>
                    <button v-if="delFunc" @click="delFunc(obj)">Del</button>
                    <button v-if="otherFunc" @click="otherFunc(obj)">Other</button>
                </div>
            </div>
        </div>
    </section>

    <Loading v-else />
</template>

<style>
</style>