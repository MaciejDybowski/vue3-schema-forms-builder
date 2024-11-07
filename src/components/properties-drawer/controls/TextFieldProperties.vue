<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <!--  <is-number-property v-model="model.type"/>
    <col-property v-model="model.layout.cols"/>
    <offset-property v-model="model.layout.offset"/>
    <fill-row-property v-model="model.layout.fillRow"/>
    <required-property v-model="model.required"/>
    <read-only-property v-model="model.layout.props.readonly"/>
    <if-property v-model="model.layout.if"/>
    <switch-general
      v-model="model.layout.hide"
      :label="model.layout.hide ? t('hide') : t('visible')"
    />

    <textfield-general
      :label="t('expression')"
      v-model="model.expression"
    />

    <textfield-general
      :label="t('calculation')"
      v-model="model.calculation"
    />
    <textfield-general
      :label="t('hint')"
      v-model="model.layout.props['hint']"
    />
    <textfield-general
      :label="t('persistentHintIfExpression')"
      :model-value="model.layout.props['persistent-hint']"
      @update:model-value="updateExpressionPersistentHint"
    />
    <checkbox-general
      :label="t('persistentHint')"
      v-model="model.layout.props['persistent-hint']"
    />-->

  <v-list-item>
    <v-list-item-title>{{ t('validations') }}</v-list-item-title>
    <v-list-item-subtitle>
      <v-divider/>
    </v-list-item-subtitle>
  </v-list-item>
  <number-general
    v-model="model.layout.props['counter']"
    :label="t('counter')"
  />

  <event-configuration/>


</template>

<script lang="ts" setup>

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import {useI18n} from "vue-i18n";
import NumberGeneral from "@/components/properties-drawer/atoms/NumberGeneral.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import EventConfiguration from "@/components/properties-drawer/atoms/EventConfiguration.vue";

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
