<template>

  <text-property-wrapper
    v-model="labelValue"
    :label="t('label')"
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

const labelValue = getValueForInput('label', modelValue)

function referenceChangedTrigger() {
  referenceChanged(modelValue, "label", labelValue.value)
}


</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "label": "Label"
  },
  "pl": {
    "label": "Etykieta"
  }
}
</i18n>
