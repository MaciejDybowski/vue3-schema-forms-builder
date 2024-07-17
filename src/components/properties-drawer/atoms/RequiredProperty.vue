<template>
  <v-list-item>
    <v-checkbox
      class="mx-2"
      :label="t('requiredProperty')"
      v-model="modelValue"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useStyle} from "@/composables/useStyle";

const modelValue = defineModel()
const style = useStyle()

const {t} = useI18n()

</script>

<style scoped lang="scss">
</style>

<i18n lang="json">
{
  "en": {
    "requiredProperty": "Required"
  },
  "pl": {
    "requiredProperty": "Pole wymagane"
  }
}
</i18n>
