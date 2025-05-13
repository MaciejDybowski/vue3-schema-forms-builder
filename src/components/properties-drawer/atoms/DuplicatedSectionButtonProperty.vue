<template>
  <v-list-item>
    <textfield-general
      v-model="duplicatedSectionButton"
      :label="t('duplicatedSectionButtonText')"
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
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {useTranslateInput} from "@/composables/useTranslateInput";

const modelValue = defineModel()
const {t} = useI18n()

const {
  prefix,
  isReference,
  referenceChanged,
  getValueForInput
} = useTranslateInput()

const duplicatedSectionButton = getValueForInput('addBtnText', modelValue)

function referenceChangedTrigger() {
  referenceChanged(modelValue, "addBtnText", duplicatedSectionButton.value)
}


</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "duplicatedSectionButtonText": "Button text"
  },
  "pl": {
    "duplicatedSectionButtonText": "Text przycisku"
  }
}
</i18n>
