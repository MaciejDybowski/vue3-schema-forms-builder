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
      <label-property v-model="model"/>

      <text-property-wrapper
        v-model="model.fileLabel"
        :label="t('fileLabel')"
      />
      <text-property-wrapper
        v-model="model.fileAvailableExtensions"
        :label="t('fileAvailableExtensions')"
        :persistent-hint="true"
        :hint="t('fileAvailableExtensionsHint')"
      />
      <number-property-wrapper
        v-model="model.fileMaxSize"
        :label="t('fileMaxSize')"
      />

    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <fill-row-property v-model="model.layout.fillRow"/>
      <text-property-wrapper v-model="model.layout.cellClass" label="Cell CSS classes"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
      <read-only-property v-model="model.layout.props.readonly"/>
    </expansion-panel>
    <validation-configuration :active="panels.includes('validations')"/>
  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import {useI18n} from "vue-i18n";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";


const panels = ref<string[]>(["general"])
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
  "pl": {
    "fileLabel": "Etykieta pliku",
    "fileAvailableExtensions": "Dostępne rozszerzenie",
    "fileAvailableExtensionsHint": "Rozszerzenia rodzielone przecinkiem",
    "fileMaxSize": "Max. rozmiar w MB"
  },
  "en": {
    "fileLabel": "File label",
    "fileAvailableExtensions": "Available extension",
    "fileAvailableExtensionsHint": "Extensions separated by comma",
    "fileMaxSize": "Max. size in MB"
  }
}
</i18n>
