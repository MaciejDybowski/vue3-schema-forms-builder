<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <is-number-property v-model="model.type"/>
  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <required-property v-model="model.required"/>
  <read-only-property v-model="model.layout.props.readonly"/>
  <if-property v-model="model.layout.if"/>

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
import IsNumberProperty from "@/components/properties-drawer/atoms/isNumberProperty.vue";
import CheckboxGeneral from "@/components/properties-drawer/atoms/CheckboxGeneral.vue";
import {useI18n} from "vue-i18n";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";

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
</style>

<i18n lang="json">
{
  "en": {
    "calculation": "Calculation",
    "hint": "Hint",
    "persistentHint": "Is the hint always visible?",
    "persistentHintIfExpression": "Hint expression"
  },
  "pl": {
    "calculation": "Obliczenia",
    "hint": "Podpowiedź",
    "persistentHint": "Czy hint zawsze widoczny?",
    "persistentHintIfExpression": "Podpowiedź warunek"
  }
}
</i18n>
