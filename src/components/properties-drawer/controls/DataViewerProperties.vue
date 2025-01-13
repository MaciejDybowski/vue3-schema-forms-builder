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
      <label-property v-model="model.label"/>
      <data-viewer-type-property v-model="model.type"/>
      <value-mapping-property v-model="model.valueMapping"/>
      <source-property
        v-if="model.type=='dictionary'"
        v-model="source"
      />
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <offset-property v-model="model.layout.offset"/>
      <fill-row-property v-model="model.layout.fillRow"/>
      <offset-property v-model="model.layout.offset"/>
    </expansion-panel>

    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic">
      <read-only-property v-model="model.layout.props.readonly"/>

      <if-property v-model="model.layout.if"/>
      <switch-general
        v-model="model.layout.hide"
        :label="model.layout.hide ? t('hide') : t('visible')"
      />
    </expansion-panel>

    <expansion-panel
      :active="panels.includes('expressions')"
      title="Expressions"
      value="expressions"
    >
      <calculatiuon-property v-model="model.calculation"/>
    </expansion-panel>

  </v-expansion-panels>

</template>

<script lang="ts" setup>

import {useBuilderState} from "@/pinia/stores/useBuilderState";
import {computed, ref} from "vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import ValueMappingProperty from "@/components/properties-drawer/atoms/ValueMappingProperty.vue";
import SourceProperty from "@/components/properties-drawer/atoms/SourceProperty.vue";
import CalculatiuonProperty from "@/components/properties-drawer/atoms/CalculatiuonProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import DataViewerTypeProperty from "@/components/properties-drawer/atoms/DataViewerTypeProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const panels = ref<string[]>(["general"])
const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const source = computed({
  get() {
    if (!model.value.source) {
      return {}
    } else {
      return model.value.source
    }
  },
  set(val) {
    useBuilderStateStore.setKeyInConfiguredField("source", val)
  }
})

</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "hide": "Hide",
    "visible": "Visible"
  },
  "pl": {
    "hide": "Ukryte",
    "visible": "Widoczne"
  }
}
</i18n>
