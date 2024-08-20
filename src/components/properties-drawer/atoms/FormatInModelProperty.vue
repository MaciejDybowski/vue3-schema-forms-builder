<template>
  <v-list-item>
    <v-text-field
      v-model="modelValue"
      :label="t('label')"
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

const {t} = useI18n()
</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "label": "Format in model"
  },
  "pl": {
    "label": "Format w modelu"
  }
}
</i18n>
