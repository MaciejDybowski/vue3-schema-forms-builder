<template>

  <text-property-wrapper
    v-model="hintValue"
    :label="t('hint')"
    :prefix="isReference? prefix: ''"

  />
  <boolean-switch-property-wrapper
    v-model="isReference"
    color="green"
    label="Use Reference"
    @change="referenceChangedTrigger"
  />


</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useTranslateInput} from "@/composables/useTranslateInput";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";


const modelValue = defineModel<any>();
const {t} = useI18n();
const {
  prefix,
  isReference,
  referenceChanged,
  getValueForInput
} = useTranslateInput()

const hintValue = getValueForInput('hint', modelValue)

function referenceChangedTrigger() {
  referenceChanged(modelValue, "hint", hintValue.value)
}


</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "hint": "Hint"
  },
  "pl": {
    "hint": "Podpowiedź"
  }
}
</i18n>
