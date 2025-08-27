<template>

  <text-property-wrapper
    v-model="suffixValue"
    :label="t('suffix')"
    :prefix="isReference? suffix: ''"

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
  suffix,
  isReference,
  referenceChanged,
  getValueForInput
} = useTranslateInput()

const suffixValue = getValueForInput('suffix', modelValue)

function referenceChangedTrigger() {
  referenceChanged(modelValue, "suffix", suffixValue.value)
}


</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "suffix": "Suffix"
  },
  "pl": {
    "suffix": "Suffix"
  }
}
</i18n>
