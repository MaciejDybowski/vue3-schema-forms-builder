<template>
  <div>
    <textfield-general
      v-model="hintValue"
      :label="t('hint')"
      :prefix="isReference? prefix: ''"

    />
    <v-switch
      v-model="isReference"
      class="mx-4"
      color="green"
      hide-details="auto"
      label="Use Reference"
      @change="referenceChangedTrigger"
    />


  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {useTranslateInput} from "@/composables/useTranslateInput";


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
