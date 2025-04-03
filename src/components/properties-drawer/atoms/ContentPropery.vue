<template>
  <div>
    <textfield-general
      v-model="contentValue"
      :label="t('contentProperty')"
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
      :key="contentValue"
      v-model="modelValue.i18n"
      :input-key="i18nInputKey"
    />
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TranslationInput from "@/components/properties-drawer/atoms/TranslationInput.vue";
import {useTranslateInput} from "@/composables/useTranslateInput";
import {onBeforeMount} from "vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";

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

const contentValue = useDynamicInputValue('content', modelValue)

function referenceChangedTrigger() {
  referenceChanged(modelValue, contentValue, "content")
}

function updatePropertyTrigger(value: string) {
  updateProperty(value, modelValue, "content")
}

onBeforeMount(() => {
  init(modelValue, "content")
})

</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "contentProperty": "Text value"
  },
  "pl": {
    "contentProperty": "Tekst"
  }
}
</i18n>
