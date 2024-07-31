<template>
  <div :class="fieldWrapperItemClass(element, isHovering)"
       :style="getStyleForBuilderField(element, isHovering)"
       v-on="attrs"

  >
    <field-wrapper-toolbar
      v-if="isToolbarVisible(isHovering, element)"
      :element="element"
    />
    <form-node-mock :element="element"
                    @click="configControl(element)"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, useAttrs} from "vue";

import {useDrawers} from "../../composables/useDrawers";
import FieldWrapperToolbar from "./FieldWrapperToolbar.vue";
import FormNodeMock from "./FormNodeMock.vue";
import {useBuilderState} from "../../pinia/stores/useBuilderState";
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
    if (theme.isLightTheme.value) {
      return "outline: 1px #1b243a solid; background-color:#E1F5FE;"
    } else {
      return "outline: 1px #777777 solid;"
    }

  }
  if (hover) {
    if (theme.isLightTheme.value) {
      return "outline: 1px #1b243a solid; cursor:pointer"
    } else {
      return "outline: 1px #777777 solid; cursor:pointer"
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


<style lang="scss" scoped>
.field-wrapper {
  position: relative;
}
</style>
