<template>
  <draggable
    :key="modelValue?.length"
    v-model="modelValue"
    :emptyInsertThreshold="emptyInsertThreshold"
    :sort="true"
    class="d-flex flex-wrap v-row"
    item-key="key"
    v-bind="dragOptions"
  >
    <template #item="{element}">
      <field-wrapper :element="element"/>
    </template>
  </draggable>
</template>

<script lang="ts" setup>

// https://github.com/SortableJS/vue.draggable.next/issues/111
import draggable from "../../vuedraggable/vuedraggable";
import FieldWrapper from "../builder/FieldWrapper.vue";
import {watch} from "vue";

const modelValue = defineModel<any[]>()


const props = withDefaults(defineProps<{
  emptyInsertThreshold?: number,
  sectionKey?: string | null
}>(), {
  emptyInsertThreshold: 100,
  sectionKey: null
})

if (props.sectionKey) {
  watch(() => modelValue.value, (value) => {
    modelValue.value?.forEach(it => {
      it['sectionKey'] = props.sectionKey
    })
  }, {deep: true})
}

const dragOptions = {
  animation: 250,
  group: "controls",
  ghostClass: "ghost"
};

</script>


<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
