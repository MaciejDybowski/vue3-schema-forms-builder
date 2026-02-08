<template>
  <div :class="fieldWrapperItemClass(element, isHovering)"
       :style="getStyleForBuilderField(element, isHovering)"
       v-on="attrs"
  >
    <field-wrapper-toolbar
      v-if="isToolbarVisible(isHovering, element)"
      :element="element"
    />

    <div class="handle"
         style="cursor: grab"
    >
      <!-- TODO zmienić tego ifa na markdown gdy markdown bedzie tez w trybie edycji -->
      <div v-if="element.ref">
        {{ element.ref }}
      </div>
      <div v-else-if="element.layout.component == 'markdown'">
        Markdown content will be here
      </div>
      <form-node-mock v-else-if="!element.ref"
                      :element="element"/>


    </div>

  </div>
</template>

<script lang="ts" setup>
import {computed, useAttrs} from "vue";

import {useDrawers} from "@/composables/useDrawers";
import FieldWrapperToolbar from "./FieldWrapperToolbar.vue";
import FormNodeMock from "./FormNodeMock.vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import {useVTheme} from "@/composables/useVTheme";


const props = defineProps<{
  isHovering: boolean | undefined
  element: any,
}>()

const theme = useVTheme()
const attrs = useAttrs()
const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()

const currentItemKey = computed(() => {
  return useBuilderStateStore.getConfiguredFieldKey
})
const currentItemSectionKey = computed(() => {
  return useBuilderStateStore.getConfiguredField.sectionKey
})

const fieldIsCurrentConfigured = computed(() => (element: any) => {
  if ("sectionKey" in element) {
    return element.key === currentItemKey.value && element.sectionKey === currentItemSectionKey.value
  } else {
    return element.key === currentItemKey.value
  }
})

const isToolbarVisible = computed(() => (isHovering: any, element: any) => {
  return isHovering || fieldIsCurrentConfigured.value(element)
})

function fieldWrapperItemClass(element: any, isHovering: any) {
  if (element.ref) {
    return "field-wrapper"
  }
  if (element.layout.component !== "duplicated-section" || element.layout.component !== "fields-group") {
    return isToolbarVisible.value(isHovering, element) ? 'field-wrapper pa-1 pt-2' : 'pa-1 pt-2'
  } else {
    return "field-wrapper"
  }
}

function getStyleForBuilderField(element: any, hover: any) {
  const baseStyle = "border-radius: 0 0 6px 6px;"

  if (theme.isLightTheme.value) {
    if (fieldIsCurrentConfigured.value(element)) {
      return `${baseStyle} outline: 1px solid rgb(var(--v-theme-primary)); background-color: rgba(var(--v-theme-primary), 0.1);`
    }
    if (hover) {
      return `${baseStyle} outline: 1px solid rgba(var(--v-theme-primary), 0.4); background-color: rgba(var(--v-theme-primary), 0.03); cursor: pointer;`
    }
  } else {
    // Dark mode - użyj #a5a5a5
    if (fieldIsCurrentConfigured.value(element)) {
      return `${baseStyle} outline: 1px solid #a5a5a5; background-color: rgba(165, 165, 165, 0.15);`
    }
    if (hover) {
      return `${baseStyle} outline: 1px solid #a5a5a5; background-color: rgba(165, 165, 165, 0.05); cursor: pointer;`
    }
  }
  return baseStyle
}
</script>


<style lang="scss" scoped>
.field-wrapper {
  position: relative;
  border-radius: 0 0 6px 6px;
}

/* Usunięto wszelkie transitiony - wszystkie zmiany mają być natychmiastowe */
</style>
