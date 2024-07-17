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

    <div v-else>
      <draggable-area
        class="pt-6"
        :style="element.tempItems?.length === 0 ? duplicatedSectionStyle : undefined"
        v-model="element.tempItems"
        :empty-insert-threshold="30"
      />
      <v-divider
        v-if="element.layout.options.showDivider"
        class="mb-2 mx-4"
      />
      <v-btn
        class="mx-4"
        size="small"
        variant="flat"
        :rounded="true"
        prepend-icon='mdi-plus'
        :color="color"
      >
        {{ element.layout.options.addBtnText }}
      </v-btn>
    </div>

  </div>
</template>

<script setup lang="ts">

import DraggableArea from "./DraggableArea.vue";
import {computed, ref, watch} from "vue";
import {useVTheme} from "@/composables/useVTheme";

const props = defineProps<{
  element: any
}>()

const theme = useVTheme()
const color = theme.isDarkTheme.value ? "white" : "primary";

const duplicatedSectionStyle = computed(() => {
  if (theme.isLightTheme.value) {
    return 'min-height:50px; outline: 1px #1b243a solid; background-color:#E1F5FE; border-bottom: 0px'
  } else {
    return 'min-height:50px; outline: 1px #777777 solid; background-color:#a5a5a5; border-bottom: 0px'
  }
})

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
