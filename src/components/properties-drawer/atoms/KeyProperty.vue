<template>
  <v-list-item>
    <v-text-field
      v-model="modelValue"
      :label="t('modelKey')"
      class="pt-2"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const modelValue = defineModel()
const style = useStyle()

const {t} = useI18n();

</script>

<style lang="scss" scoped>
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
