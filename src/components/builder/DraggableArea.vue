<template>
  <draggable
    v-model="modelValue"
    :sort="true"
    :emptyInsertThreshold="emptyInsertThreshold"
    item-key="key"
    v-bind="dragOptions"
    class="d-flex flex-wrap"
  >
    <template #item="{element}">
      <field-wrapper :element="element"/>
    </template>
  </draggable>
</template>

<script setup lang="ts">

import draggable from 'vuedraggable'
import FieldWrapper from "@/components/builder/FieldWrapper.vue";

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


<style scoped lang="scss">
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
