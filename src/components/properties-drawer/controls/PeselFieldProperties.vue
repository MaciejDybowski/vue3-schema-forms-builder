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


    <validations-panel
      v-model="model"
      :active="panels.includes('validations')"
      :show-counter="false"
    >
      <template #beforeRequired>

        <boolean-checkbox-property-wrapper
          v-model="isChecksumEnabled"
          :label="t('isChecksumEnabled')"
        />

        <select-general
          v-if="isChecksumEnabled"
          v-model="model.checkSumValidation"
          :clearable="false"
          :items="[
          {value: 'warning', title: t('validation.warning')},
          {value: 'error', title: t('validation.error')},
       ]"
          :label="t('validation.type')"
          :return-object="false"
        />

        <boolean-checkbox-property-wrapper
          v-model="isAdultValidationEnabled"
          :label="t('isAdultValidationEnabled')"
        />

        <select-general
          v-if="isAdultValidationEnabled"
          v-model="model.adultsValidation"
          :clearable="false"
          :items="[
          {value: 'warning', title: t('validation.warning')},
          {value: 'error', title: t('validation.error')},
       ]"
          :label="t('validation.type')"
          :return-object="false"
        />
      </template>
    </validations-panel>

    <event-configruation-panel
      :active="panels.includes('events')"
    />
  </v-expansion-panels>

</template>

<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import {useI18n} from "vue-i18n";

import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";

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

const isChecksumEnabled = ref(false)
const isAdultValidationEnabled = ref(false)

const {t} = useI18n()

onMounted(() => {
  if(model.value.checkSumValidation != undefined) {
    isChecksumEnabled.value = true
  }

  if(model.value.adultsValidation != undefined){
    isAdultValidationEnabled.value = true
  }
})

</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>

<i18n lang="json">
{
  "en": {
    "isChecksumEnabled": "Is checksum validation enabled",
    "isAdultValidationEnabled": "Is adults validation enabled",
    "validation": {
      "warning": "Is validation warning",
      "error": "Is validation error",
      "type": "Validation type"
    },
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
    "isChecksumEnabled": "Włączona walidacji sumy kontrolnej",
    "isAdultValidationEnabled": "Włączona walidacja wieku",
    "validation": {
      "warning": "Ostrzeżenie",
      "error": "Błąd",
      "type": "Typ"
    },
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
