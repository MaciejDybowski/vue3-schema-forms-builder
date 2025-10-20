<template>
  <expansion-panel
    :active="active"
    :title="t('fieldProperties')"
    value="fieldProps"
  >

    <hint-property v-model="model.layout.props"/>
    <prefix-property v-model="model.layout.props"/>
    <suffix-property v-model="model.layout.props"/>

    <boolean-checkbox-property-wrapper
      v-model="model.layout.props['persistent-hint']"
      :hint="t('persistentHintDescription')"
      :label="t('persistentHint')"
    />
    <text-property-wrapper
      :hint="t('persistentHintIfExpressionDescription')"
      :label="t('persistentHintIfExpression')"
      :model-value="model.layout.props['persistent-hint']"
      @update:model-value="updateExpressionPersistentHint"
    />

  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {useI18n} from "vue-i18n";
import HintProperty from "@/components/properties-drawer/atoms/HintProperty.vue";
import PrefixProperty from "@/components/properties-drawer/atoms/PrefixProperty.vue";
import SuffixProperty from "@/components/properties-drawer/atoms/SuffixProperty.vue";

const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: false
})

const model = defineModel<any>()
const {t} = useI18n()

function updateExpressionPersistentHint(val: string | boolean) {
  model.value.layout.props['persistent-hint'] = val || false
}
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "fieldProperties": "Field properties",
    "hint": "Hint text",
    "hintDescription": "A short helper text displayed below the field.",
    "prefix": "Prefix",
    "prefixDescription": "Text or icon displayed before the field value.",
    "suffix": "Suffix",
    "suffixDescription": "Text or icon displayed after the field value.",
    "persistentHintIfExpression": "Persistent hint (expression)",
    "persistentHintIfExpressionDescription": "JSONata expression that determines whether the hint remains visible permanently.",
    "persistentHint": "Persistent hint",
    "persistentHintDescription": "When enabled, the hint remains visible at all times."
  },
  "pl": {
    "fieldProperties": "Właściwości pola",
    "hint": "Podpowiedź",
    "hintDescription": "Krótki tekst pomocniczy wyświetlany pod polem.",
    "prefix": "Prefiks",
    "prefixDescription": "Tekst lub ikona wyświetlana przed wartością pola.",
    "suffix": "Sufiks",
    "suffixDescription": "Tekst lub ikona wyświetlana po wartości pola.",
    "persistentHintIfExpression": "Stała podpowiedź (wyrażenie)",
    "persistentHintIfExpressionDescription": "Wyrażenie JSONata określające, czy podpowiedź ma być stale widoczna.",
    "persistentHint": "Stała podpowiedź",
    "persistentHintDescription": "Gdy włączone, podpowiedź jest widoczna cały czas."
  }
}
</i18n>
