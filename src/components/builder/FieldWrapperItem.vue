<template>
  <div :class="fieldWrapperItemClass(element, isHovering)"
       :style="getStyleForBuilderField(element, isHovering)"
       v-on="attrs"
       @click="configControl(element)"
  >
    <field-wrapper-toolbar
      v-if="isToolbarVisible(isHovering, element)"
      :element="element"
    />
    <form-node-mock :element="element"/>
  </div>
</template>

<script setup lang="ts">
import {computed, useAttrs} from "vue";

import {useDrawers} from "@/composables/useDrawers";
import FieldWrapperToolbar from "@/components/builder/FieldWrapperToolbar.vue";
import FormNodeMock from "@/components/builder/FormNodeMock.vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";

const props = defineProps<{
  isHovering: boolean | undefined
  element: any,
}>()

const attrs = useAttrs()
const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()

const currentItemKey = computed(() => {
  return useBuilderStateStore.getConfiguredFieldKey
})

const isToolbarVisible = computed(() => (isHovering: any, element: any) => {
  return isHovering || element.key === currentItemKey.value
})

function fieldWrapperItemClass(element: any, isHovering: any) {
  if (element.layout.component !== "duplicated-section") {
    return isToolbarVisible.value(isHovering, element) ? 'field-wrapper pa-3' : 'pa-3'
  } else {
    return "field-wrapper"
  }
}

function getStyleForBuilderField(element: any, hover: any) {
  if (element.key === currentItemKey.value) {
    // Apply style to the clicked item
    return "outline: 1px #3a65c9 solid; background-color:#E1F5FE;"
  }
  if (hover) {
    return "outline: 1px #3a65c9 solid; cursor:pointer"
  }
  return "" // No style applied for other items
}


function configControl(element: any) {
  if (element.layout.component !== 'duplicated-section') {
    useBuilderStateStore.setConfiguredField(element)
    drawers.propertiesDrawer.value = true
  }
}

</script>


<style scoped lang="scss">
.field-wrapper {
  position: relative;
}
</style>
