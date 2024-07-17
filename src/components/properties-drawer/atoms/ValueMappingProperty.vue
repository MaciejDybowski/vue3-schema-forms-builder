<template>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('valueMapping')"
      v-model="modelValue"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const modelValue = defineModel()
const style = useStyle()

const {t} = useI18n()
</script>

<style scoped lang="scss">
</style>

<i18n lang="json">
{
  "en": {
    "valueMapping": "Value mapping"
  },
  "pl": {
    "valueMapping": "Mapowanie wartości"
  }
}
</i18n>
