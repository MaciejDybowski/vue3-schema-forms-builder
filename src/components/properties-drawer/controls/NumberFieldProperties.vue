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
      <v-list-item>
        <v-switch
          v-model="model.type"
          :label="model.type=='int' ? t('int') : t('float')"
          class="mx-2"
          false-value="float"
          hide-details="auto"
          true-value="int"
        />
      </v-list-item>

      <text-property-wrapper
        v-if="model.type=='float'"
        v-model="model.precision"
        :label="t('precision')"
        type="number"
      />
      <text-property-wrapper
        v-if="model.type=='float'"
        v-model="model.precisionMin"
        :label="t('precisionMin')"
        type="number"
      />

      <select-general
        v-if="model.type=='float'"
        v-model="model.roundOption"
        :items="[{value: 'ceil', title: t('ceilOptionLabel')}, {value:'floor', title: t('floorOptionLabel')}, {value:'round', title: t('roundOptionLabel')}]"
        :label="t('roundLabel')"
        :return-object="false"
        clearable
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

      <read-only-expression-property
        :model-value="model.layout.props.readonly"
        @update:model-value="updateExpressionReadonly"
      />
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
      <expression-property v-model="model.expression"/>

      <calculatiuon-property v-model="model.calculation"/>

    </expansion-panel>

    <expansion-panel
      :active="panels.includes('fieldProps')"
      title="Field properties"
      value="fieldProps"
    >
      <text-property-wrapper
        v-model="model.layout.props['hint']"
        :label="t('hint')"
      />
      <text-property-wrapper
        v-model="model.layout.props['prefix']"
        :label="t('prefix')"
      />
      <text-property-wrapper
        v-model="model.layout.props['suffix']"
        :label="t('suffix')"
      />
      <text-property-wrapper
        :label="t('persistentHintIfExpression')"
        :model-value="model.layout.props['persistent-hint']"
        @update:model-value="updateExpressionPersistentHint"
      />
      <boolean-checkbox-property-wrapper
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
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/offset/OffsetProperty.vue";
import {useI18n} from "vue-i18n";

import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import EventConfiguration from "@/components/properties-drawer/atoms/EventConfiguration.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import ExpressionProperty from "@/components/properties-drawer/atoms/ExpressionProperty.vue";
import CalculatiuonProperty from "@/components/properties-drawer/atoms/CalculatiuonProperty.vue";
import ReadOnlyExpressionProperty from "@/components/properties-drawer/atoms/ReadOnlyExpressionProperty.vue";

const panels = ref<string[]>(["general", "logic", "expressions"])
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
  if (!val) {
    model.value.layout.props['persistent-hint'] = false
  } else {
    model.value.layout.props['persistent-hint'] = val
  }
}

function updateExpressionReadonly(val: string) {
  if (!val) {
    model.value.layout.props['readonly'] = false
  } else {
    model.value.layout.props['readonly'] = val
  }
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
    "precisionMin": "Precision (min)",
    "calculation": "Calculation",
    "hint": "Hint",
    "persistentHint": "Is the hint always visible?",
    "persistentHintIfExpression": "Hint expression",
    "hide": "Hide",
    "visible": "Visible",
    "expression": "Expression",
    "readonlyIfExpression": "Readonly expression",
    "roundLabel": "Round option",
    "ceilOptionLabel": "Ceil option",
    "floorOptionLabel": "Float option",
    "roundOptionLabel": "Round option",
    "suffix": "Suffix",
    "prefix": "Prefix"
  },
  "pl": {
    "int": "Całkowita",
    "float": "Zmiennoprzecinkowa",
    "precision": "Precyzja zaokrągleń",
    "precisionMin": "Precyzja zaokrągleń (min)",
    "calculation": "Obliczenia",
    "hint": "Podpowiedź",
    "persistentHint": "Czy hint zawsze widoczny?",
    "persistentHintIfExpression": "Podpowiedź warunek",
    "hide": "Ukryte",
    "visible": "Widoczne",
    "expression": "Wyrażenie",
    "readonlyIfExpression": "Readonly wyrażenie",
    "roundLabel": "Opcje zaokrąglania",
    "ceilOptionLabel": "Ceil",
    "floorOptionLabel": "Floor",
    "roundOptionLabel": "Round",
    "suffix": "Suffix",
    "prefix": "Prefix"
  }
}
</i18n>
