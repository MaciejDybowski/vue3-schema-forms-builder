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
      <default-value-property/>

      <select-general
        v-model="model.variant"
        :items="[{value: 'combobox', title: t('combobox')}, {value:'list', title: t('list')}]"
        :label="t('variant')"
        :return-object="false"
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
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
      <read-only-property v-model="model.layout.props.readonly"/>
      <switch-general
        v-model="model.layout.hide"
        :label="model.layout.hide ? t('hide') : t('visible')"
      />
    </expansion-panel>

    <expansion-panel
      :active="panels.includes('source')"
      title="Source"
      value="source"
    >
      <source-property v-model="source"/>
    </expansion-panel>
    <validation-configuration :active="panels.includes('validations')"/>
  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import {useI18n} from "vue-i18n";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import SourceProperty from "@/components/properties-drawer/atoms/SourceProperty.vue";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";

const {t} = useI18n()
const panels = ref<string[]>(["general", "layout", "source"])

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
    "visible": "Visible",
    "combobox": "Combobox",
    "list": "List",
    "variant": "Variant"
  },
  "pl": {
    "hide": "Ukryte",
    "visible": "Widoczne",
    "combobox": "Combobox",
    "list": "Lista",
    "variant": "Wariant"
  }
}
</i18n>
