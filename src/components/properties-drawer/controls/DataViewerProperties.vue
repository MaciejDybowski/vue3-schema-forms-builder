<template>

  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >

    <general-panel
      v-model="model"
      :active="panels.includes('general')"
    >
      <template #afterKey>
        <label-property v-model="model"/>
        <default-value-property/>
        <select-general
          v-model="model.type"
          :items="items"
          :label="t('typeProperty')"
          :return-object="false"
          clearable
        />

        <text-property-wrapper
          v-model="model.valueMapping"
          :label="t('typeOptions.valueMapping')"
        />

        <source-property
          v-if="model.type=='dictionary'"
          v-model="source"
        />
      </template>
    </general-panel>


    <layout-panel
      v-model="model"
      :active="panels.includes('layout')"
    />

    <logic-panel
      v-model="model"
      :active="panels.includes('logic')"
      :show-read-only-control="false"
    />

    <expressions-panel
      v-model="model"
      :active="panels.includes('expressions')"
      :show-expression="false"
    />

  </v-expansion-panels>

</template>

<script lang="ts" setup>

import {useBuilderState} from "@/pinia/useBuilderState";
import {computed, ref} from "vue";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import SourceProperty from "@/components/properties-drawer/atoms/SourceProperty.vue";
import {useI18n} from "vue-i18n";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import ExpressionsPanel from "@/components/properties-drawer/panels/ExpressionsPanel.vue";

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
