<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <textfield-general
    :label="t('defaultValue')"
    :model-value="model.default"
    @update:model-value="updateNumberDefaultValue"
  />
  <v-list-item>
    <v-switch
      class="mx-2"
      v-model="model.type"
      :label="model.type=='int' ? t('int') : t('float')"
      false-value="float"
      true-value="int"
      hide-details="auto"
    />
  </v-list-item>

  <textfield-general
    v-if="model.type=='float'"
    :label="t('precision')"
    v-model="model.precision"
    type="number"
  />

  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <required-property v-model="model.required"/>
  <read-only-property v-model="model.layout.props.readonly"/>
  <textfield-general
    :label="t('readonlyIfExpression')"
    :model-value="model.layout.props.readoonly"
    @update:model-value="updateExpressionReadonly"
  />

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
  />

</template>

<script lang="ts" setup>

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import RequiredProperty from "@/components/properties-drawer/atoms/RequiredProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import {useI18n} from "vue-i18n";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import CheckboxGeneral from "@/components/properties-drawer/atoms/CheckboxGeneral.vue";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";

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
const regex = /^if\(([^,]+),([^,]+),([^)]+)\)$/;

function updateExpressionPersistentHint(val: string) {
  const matches = val.match(regex)
  if (matches) {
    model.value.layout.props['persistent-hint'] = val
  }
}

function updateExpressionReadonly(val: string) {
  const matches = val.match(regex)
  if (matches) {
    model.value.layout.props['readonly'] = val
  }
}

function updateNumberDefaultValue(val: string) {
  model.value.default = Number(val)
}
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "int": "Integer",
    "float": "Float",
    "precision": "Precision",
    "calculation": "Calculation",
    "hint": "Hint",
    "persistentHint": "Is the hint always visible?",
    "persistentHintIfExpression": "Hint expression",
    "hide": "Hide",
    "visible": "Visible",
    "expression": "Expression",
    "readonlyIfExpression": "Readonly expression",
    "defaultValue": "Default value"
  },
  "pl": {
    "int": "Całkowita",
    "float": "Zmiennoprzecinkowa",
    "precision": "Precyzja zaokrągleń",
    "calculation": "Obliczenia",
    "hint": "Podpowiedź",
    "persistentHint": "Czy hint zawsze widoczny?",
    "persistentHintIfExpression": "Podpowiedź warunek",
    "hide": "Ukryte",
    "visible": "Widoczne",
    "expression": "Wyrażenie",
    "readonlyIfExpression": "Readonly wyrażenie",
    "defaultValue": "Wartość domyślna"
  }
}
</i18n>
