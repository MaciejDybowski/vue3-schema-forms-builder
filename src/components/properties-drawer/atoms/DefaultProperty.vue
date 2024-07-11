<template>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('defaultProperty')"
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
</script>

<style scoped lang="scss">
</style>

<i18n lang="json">
{
  "en": {
    "defaultProperty": "Default value"
  },
  "pl": {
    "defaultProperty": "Domyślna wartość"
  }
}
</i18n>
