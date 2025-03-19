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
      :active="panels.includes('expressions')"
      title="Expressions"
      value="expressions"
    >
      <textfield-general
        v-model="model.expression"
        :label="t('expression')"
      />

    </expansion-panel>
    <expansion-panel
      :active="panels.includes('fieldProps')"
      title="Field properties"
      value="fieldProps"
    >
      <textfield-general
        v-model="model.layout.props['hint']"
        :label="t('hint')"
      />
      <textfield-general
        :label="t('persistentHintIfExpression')"
        :model-value="model.layout.props['persistent-hint']"
        @update:model-value="updateExpressionPersistentHint"
      />
      <checkbox-general
        v-model="model.layout.props['persistent-hint']"
        :label="t('persistentHint')"
      />
    </expansion-panel>
    <validation-configuration :active="panels.includes('validations')"
    />
    <event-configuration :active="panels.includes('events')"/>
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import {useI18n} from "vue-i18n";
import EventConfiguration from "@/components/properties-drawer/atoms/EventConfiguration.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import CheckboxGeneral from "@/components/properties-drawer/atoms/CheckboxGeneral.vue";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";

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

function updateExpressionPersistentHint(val: string) {
  const regex = /^if\(([^,]+),([^,]+),([^)]+)\)$/;
  const matches = val.match(regex)
  if (matches) {
    model.value.layout.props['persistent-hint'] = val
  }
}

</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>

<i18n lang="json">
{
  "en": {
    "calculation": "Calculation",
    "hint": "Hint",
    "persistentHint": "Is the hint always visible?",
    "persistentHintIfExpression": "Hint expression",
    "hide": "Hide",
    "visible": "Visible",
    "expression": "Expression",
    "validations": "Validations",
    "counter": "Counter of letters",
    "eventType": "Event type",
    "events": "Events",
    "onChangeLabel": "On value change"
  },
  "pl": {
    "calculation": "Obliczenia",
    "hint": "Podpowiedź",
    "persistentHint": "Czy hint zawsze widoczny?",
    "persistentHintIfExpression": "Podpowiedź warunek",
    "hide": "Ukryte",
    "visible": "Widoczne",
    "expression": "Wyrażenie",
    "validations": "Walidacje",
    "counter": "Licznik liter",
    "eventType": "Rodzaj zdarzenia",
    "events": "Zdarzenia",
    "onChangeLabel": "Zmiana wartości"
  }
}
</i18n>
