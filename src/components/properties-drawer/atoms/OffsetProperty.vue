<template>
  <v-list-item>
    <!-- TODO poprawic mapowanie w vue3-schema-forms oraz tutaj w fieldwrapper potrzebna inna funkcja kalkulacji -->
    <v-text-field
      disabled
      class="pt-2"
      :label="t('label') + '- #TODO on formProject'"
      v-model.number="modelValue"
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
    "label": "Offset"
  },
  "pl": {
    "label": "Przesunięcie pola"
  }
}
</i18n>
