<template>

  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >
    <expansion-panel
      :active="panels.includes('general')"
      title="General"
      value="general"
    >
      <key-property v-model="model.key"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <offset-property v-model="model.layout.offset"/>
      <fill-row-property v-model="model.layout.fillRow"/>
      <text-property-wrapper v-model="model.layout.cellClass" label="Cell CSS classes"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('fieldProps')"
      title="Properties"
      value="fieldProps"
    >
      <text-property-wrapper
        v-model="model.src"
        label="Scieżka"
      />

      <text-property-wrapper
        v-model="model.layout.props['aspect-ratio']"
        label="Aspect ratio"
      />
      <text-property-wrapper
        v-model="model.layout.props['width']"
        label="Width"
      />
      <text-property-wrapper
        v-model="model.layout.props['height']"
        label="Height"
      />
      <boolean-switch-property-wrapper
        v-model="model.layout.props['cover']"
        label="Cover"
      />
    </expansion-panel>
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/offset/OffsetProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const panels = ref<string[]>(["general", "fieldProps"])
const useBuilderStateStore = useBuilderState()

const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

</script>


<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "thumbnailUrl": "Thumbnail URL",
    "previewUrl": "Preview URL",
    "rounded": "Rounded"
  },
  "pl": {
    "thumbnailUrl": "URL miniaturki",
    "previewUrl": "URL zdjęcia",
    "rounded": "Zaokrąglenie"
  }
}
</i18n>
