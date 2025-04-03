<template>
  <div>
    <textfield-general
      v-model="labelValue"
      :label="t('label')"
      :prefix="isReference? prefix: ''"
      @update:model-value="value => updatePropertyTrigger(value)"
    />
    <v-switch
      v-model="isReference"
      class="mx-4"
      color="green"
      hide-details="auto"
      label="Use Reference"
      @change="referenceChangedTrigger"
    />

    <translation-input
      v-if="isReference && modelValue.i18n"
      :key="labelValue"
      v-model="modelValue.i18n"
      :input-key="i18nInputKey"
    />
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {onBeforeMount} from "vue";
import TranslationInput from "@/components/properties-drawer/atoms/TranslationInput.vue";
import {useTranslateInput} from "@/composables/useTranslateInput";

const modelValue = defineModel<any>();
const {t} = useI18n();
const {
  init,
  i18nInputKey,
  prefix,
  isReference,
  referenceChanged,
  updateProperty,
  useDynamicInputValue
} = useTranslateInput()

const labelValue = useDynamicInputValue('label', modelValue)

function referenceChangedTrigger() {
  referenceChanged(modelValue, labelValue, 'label')
}

function updatePropertyTrigger(value: string) {
  updateProperty(value, modelValue, 'label')
}

onBeforeMount(() => {
  init(modelValue, 'label')
})

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
