<template>
  <draggable
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

const modelValue = defineModel<any[]>()

const props = withDefaults(defineProps<{
  emptyInsertThreshold?: number,
}>(), {
  emptyInsertThreshold: 100
})

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
