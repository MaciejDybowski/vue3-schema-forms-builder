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
          v-model="model.layout.component"
          :clearable="false"
          :items="[
          {
            value: 'dictionary',
            title: t('componentOptions.autocompleteTitle'),
            subtitle: t('componentOptions.autocompleteSubtitle')
          },
          {
            value: 'combobox',
            title: t('componentOptions.comboboxTitle'),
            subtitle: t('componentOptions.comboboxSubtitle')
          },
            {value: 'data-viewer', title:t('componentOptions.dataViewer')},
        ]"
          :label="t('componentOptions.label')"
          :return-object="false"
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
    />


    <expansion-panel
      :active="panels.includes('source')"
      title="Source"
      value="source"
    >
      <source-property v-model="source"/>
    </expansion-panel>


    <validations-panel
      v-model="model"
      :active="panels.includes('validations')"
    />

    <event-configruation-panel
      :active="panels.includes('events')"
    />


  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {useBuilderState} from "@/pinia/useBuilderState";
import {computed, ref} from "vue";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import SourceProperty from "@/components/properties-drawer/atoms/SourceProperty.vue";
import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";

import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";

import {useI18n} from "vue-i18n";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";

const {t} = useI18n()
const panels = ref<string[]>(["general", "logic", "source"])
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
    "componentOptions": {
      "label": "Component type",
      "autocompleteTitle": "Autocomplete",
      "autocompleteSubtitle": "Allows selecting only values returned from the service.",
      "comboboxTitle": "Combobox",
      "comboboxSubtitle": "Allows the user to enter a value outside of the predefined set.",
      "dataViewer": "Data Viewer"
    }
  },
  "pl": {
    "componentOptions": {
      "label": "Typ komponentu",
      "autocompleteTitle": "Autocomplete",
      "autocompleteSubtitle": "Pozwala na wybór wartości tylko ze zwracanych danych z usługi.",
      "comboboxTitle": "Combobox",
      "comboboxSubtitle": "Pozwala na wpisanie wartości spoza dostępnego zbioru przez użytkownika.",
      "dataViewer": "Pole odczytu"
    }
  }
}
</i18n>
