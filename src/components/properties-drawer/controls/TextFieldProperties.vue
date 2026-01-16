<template>
  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >
    <conversion-panel :active="panels.includes('conversion')">
      <select-general
        v-model="model.layout.component"
        :clearable="false"
        :items="[
          {value: 'text-field', title: t('conversion.text')},
          {value: 'text-area', title: t('conversion.textarea')},
          {value: 'text-switch-field', title:t('conversion.textSwitch')},
          {value: 'data-viewer', title:t('conversion.dataViewer')},
       ]"
        :label="t('conversion.label')"
        :return-object="false"
      />
    </conversion-panel>

    <general-panel
      v-model="model"
      :active="panels.includes('general')"
    >
      <template #afterKey>
        <label-property v-model="model"/>
        <default-value-property/>
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


    <expressions-panel
      v-model="model"
      :active="panels.includes('expressions')"
      :show-calculation="false"
    />


    <vuetify-input-props
      v-model="model"
      :active="panels.includes('fieldProps')"
    />


    <validations-panel
      v-model="model"
      :active="panels.includes('validations')"
      :show-counter="false"
    />

    <event-configruation-panel
      :active="panels.includes('events')"
    />
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import {useI18n} from "vue-i18n";

import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import ConversionPanel from "@/components/properties-drawer/panels/ConversionPanel.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import ExpressionsPanel from "@/components/properties-drawer/panels/ExpressionsPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";
import VuetifyInputProps from "@/components/properties-drawer/panels/VuetifyInputProps.vue";

const panels = ref<string[]>(["general", "logic", "validations"])

const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const {t} = useI18n()

</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>

<i18n lang="json">
{
  "en": {
    "conversion": {
      "label": "Field",
      "text": "Text field",
      "textarea": "Text area",
      "textSwitch": "Text ➞ input field",
      "dataViewer": "Data viewer"
    },
    "calculation": "Calculation",
    "hint": "Hint",
    "persistentHint": "Is the hint always visible?",
    "persistentHintIfExpression": "Hint expression",
    "hide": "Hide",
    "visible": "Visible",
    "expression": "Use JSONata functionality or use built-in expressions.",
    "validations": "Validations",
    "counter": "Counter of letters",
    "eventType": "Event type",
    "events": "Events",
    "onChangeLabel": "On value change",
    "suffix": "Suffix",
    "prefix": "Prefix"
  },
  "pl": {
    "conversion": {
      "label": "Pole",
      "text": "Pole tekstowe",
      "textarea": "Obszar tekstowy",
      "textSwitch": "Pole tekst ➞ input",
      "dataViewer": "Pole odczytu"
    },
    "calculation": "Obliczenia",
    "hint": "Podpowiedź",
    "persistentHint": "Czy hint zawsze widoczny?",
    "persistentHintIfExpression": "Podpowiedź warunek",
    "hide": "Ukryte",
    "visible": "Widoczne",
    "expression": "Korzystaj z funkcji JSONata lub wbodowanych wyrażeń.",
    "validations": "Walidacje",
    "counter": "Licznik liter",
    "eventType": "Rodzaj zdarzenia",
    "events": "Zdarzenia",
    "onChangeLabel": "Zmiana wartości",
    "suffix": "Suffix",
    "prefix": "Prefix"
  }
}
</i18n>
