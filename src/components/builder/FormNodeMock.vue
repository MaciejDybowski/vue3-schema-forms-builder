<template>
  <div :style="calcOffset(element)">
    <component
      v-if="element.layout.component !== 'duplicated-section'"
      class="disabled-field"
      :is='`node-${element.layout.component}`'
      :schema='element'
      :model='{}'
      :key="renderKey"
    />

    <draggable-area
      class="py-6"
      v-else
      :style="element.tempItems.length === 0 ? 'min-height:50px; outline: 1px #3a65c9 solid; background-color:#E1F5FE;' : undefined"
      v-model="element.tempItems"
      :empty-insert-threshold="30"
    />
  </div>
</template>

<script setup lang="ts">

import DraggableArea from "@/components/builder/DraggableArea.vue";
import {ref, watch} from "vue";

const props = defineProps<{
  element: any
}>()

// Potrzebne do odświezania na żywo podglądu formularza gdy zmienia się propertisy w prawym modelu (szczególne te na podstawie których nic się nie dzieje)
const renderKey = ref(0)
watch(props.element, () => {
  renderKey.value += 1
}, {deep: true})

function calcOffset(element: any) {
  const isOffsetExist = !!element.layout?.offset;
  const offset = isOffsetExist ? (element.layout?.offset as number) : 0;
  const cols = element.layout?.cols as number
  return `margin-left: ${offset / (offset + cols) * 100}%`
}

</script>

<style scoped lang="scss">
.disabled-field {
  pointer-events: none; /* Disable all pointer events */
}
</style>
