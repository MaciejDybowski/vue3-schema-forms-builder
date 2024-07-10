<template>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('ifProperty')"
      v-model="modelValue"
      v-bind="fieldProps"
    />
  </v-list-item>
</template>

<script setup lang="ts">
import {VTextField} from "vuetify/components";
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
    "ifProperty": "Conditional rendering"
  },
  "pl": {
    "ifProperty": "Warunek widoczności"
  }
}
</i18n>
