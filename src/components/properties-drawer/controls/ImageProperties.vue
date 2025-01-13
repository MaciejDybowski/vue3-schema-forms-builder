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
      <textfield-general
        v-model="model.src"
        label="Scieżka"
      />

      <textfield-general
        v-model="model.layout.props['aspect-ratio']"
        label="Aspect ratio"
      />
      <textfield-general
        v-model="model.layout.props['width']"
        label="Width"
      />
      <textfield-general
        v-model="model.layout.props['height']"
        label="Height"
      />
      <switch-general
        v-model="model.layout.props['cover']"
        label="Cover"
      />
    </expansion-panel>
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import {useI18n} from "vue-i18n";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";

const panels = ref<string[]>(["general", "fieldProps"])
const useBuilderStateStore = useBuilderState()
const {t} = useI18n()
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
