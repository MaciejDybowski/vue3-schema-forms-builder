<template>
  <div :class="fieldWrapperItemClass(element, isHovering)"
       :style="getStyleForBuilderField(element, isHovering)"
       @click="configControl(element)"
       v-on="attrs"
  >
    <field-wrapper-toolbar
      v-if="isToolbarVisible(isHovering, element)"
      :element="element"
    />

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
</template>

<script lang="ts" setup>
import {computed, useAttrs} from "vue";

import {useDrawers} from "@/composables/useDrawers";
import FieldWrapperToolbar from "./FieldWrapperToolbar.vue";
import FormNodeMock from "./FormNodeMock.vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
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
    return isToolbarVisible.value(isHovering, element) ? 'field-wrapper pa-3' : 'pa-3'
  } else {
    return "field-wrapper"
  }
}

function getStyleForBuilderField(element: any, hover: any) {
  if (fieldIsCurrentConfigured.value(element)) {
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


async function configControl(element: any) {
  if (element.ref || element.layout.component !== 'duplicated-section' && element.layout.component !== "fields-group") {
    useBuilderStateStore.setConfiguredField(null)
    await new Promise((r) => setTimeout(r, 10));
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
