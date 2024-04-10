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

import {useDrawers} from "../../composables/useDrawers";
import FieldWrapperToolbar from "./FieldWrapperToolbar.vue";
import FormNodeMock from "./FormNodeMock.vue";
import {useBuilderState} from "../../pinia/stores/useBuilderState";
import { useTheme } from 'vuetify'
const props = defineProps<{
  isHovering: boolean | undefined
  element: any,
}>()



const vTheme = useTheme()
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
    if(vTheme.name.value === 'light'){
      return "outline: 1px #1b243a solid; background-color:#a5a5a5;"
    } else {
      return "outline: 1px #3e4b68 solid;"
    }

  }
  if (hover) {
    if(vTheme.name.value === 'light'){
      return "outline: 1px #1b243a solid; cursor:pointer"
    } else {
      return  "outline: 1px #3e4b68 solid; cursor:pointer"
    }
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
