<template>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('modelKey')"
      v-model="modelValue"
      v-bind="fieldProps"
    />
  </v-list-item>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useFieldStyle} from "@/composables/useFieldStyle";

const modelValue = defineModel()
const {fieldProps} = useFieldStyle();

const {t} = useI18n()

console.debug(t)
//console.debug(t('modelKey'))
</script>

<style scoped lang="scss">
</style>

<i18n lang="json">
{
  "en": {
    "modelKey": "Model reference"
  },
  "pl": {
    "modelKey": "Klucz w modelu"
  }
}
</i18n>
