<template>
  <v-list-item>
    <v-text-field
      v-model="modelValue"
      :label="t('duplicatedSectionButtonText')"
      class="pt-2"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const style = useStyle()

const modelValue = defineModel()

const {t} = useI18n()
</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "duplicatedSectionButtonText": "Button text"
  },
  "pl": {
    "duplicatedSectionButtonText": "Text przycisku"
  }
}
</i18n>
