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


      <select-general
        v-model="model.type"
        :items="items"
        :label="t('typeProperty')"
        :return-object="false"
        clearable
      />

      <text-property-wrapper
        v-model="model.valueMapping"
        :label="t('valueMapping')"
      />


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
      <text-property-wrapper v-model="model.layout.cellClass" label="Cell CSS classes"/>
    </expansion-panel>

    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic">
      <read-only-property v-model="model.layout.props.readonly"/>

      <if-property v-model="model.layout.if"/>
      <boolean-switch-property-wrapper
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

import {useBuilderState} from "@/pinia/useBuilderState";
import {computed, ref} from "vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import SourceProperty from "@/components/properties-drawer/atoms/SourceProperty.vue";
import CalculatiuonProperty from "@/components/properties-drawer/atoms/CalculatiuonProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/offset/OffsetProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import {useI18n} from "vue-i18n";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

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

const items = ref([
  {value: "text", title: t('typeOptions.text')},
  {value: "number", title: t('typeOptions.number')},
  {value: "phone", title: t('typeOptions.phone')},
  {value: "date", title: t('typeOptions.date')},
  {value: "date-time", title: t('typeOptions.date-time')},
  {value: "dictionary", title: t('typeOptions.dictionary')},
])

</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "hide": "Hide",
    "visible": "Visible",
    "typeProperty": "Type of data",
    "typeOptions": {
      "text": "Text",
      "number": "Number",
      "phone": "Phone",
      "date": "Date",
      "date-time": "Datetime",
      "dictionary": "Dictionary",
      "valueMapping": "Value mapping"
    }
  },
  "pl": {
    "hide": "Ukryte",
    "visible": "Widoczne",
    "typeProperty": "Typ danych",
    "typeOptions": {
      "text": "Tekst",
      "number": "Liczba",
      "phone": "Telefon",
      "date": "Data",
      "date-time": "Data i czas",
      "dictionary": "Wartość słownikowa",
      "valueMapping": "Mapowanie wartości"
    }
  }
}
</i18n>
