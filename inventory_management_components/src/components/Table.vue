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
})

let fields: string[] = []

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
</script>
<!-- Align field titles with values -->
<template>
    <section v-if="fields.length !== 0" :id>
        <div class="border border-vf-red flex justify-around">
            <p v-for="key of includedFields" :key="`tableField${key}`" class="grow">{{ key }}</p>
        </div>
        <div class="border border-vf-red">
            <div v-for="obj of data" :key="`tableRows${obj.id}`" class="flex justify-around">
                <p v-for="key of includedFields" :key class="grow">{{ obj[key] }}</p>
            </div>
        </div>
    </section>

    <Loading v-else />
</template>