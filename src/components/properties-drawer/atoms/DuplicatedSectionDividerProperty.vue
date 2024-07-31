<template>
  <v-list-item>
    <v-switch
      v-model="modelValue"
      :label="t('duplicatedSectionShowDivider')"
      class="mx-2"
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
    "duplicatedSectionShowDivider": "Show divider between section"
  },
  "pl": {
    "duplicatedSectionShowDivider": "Pokazuj rozdzielacz pomiędzy sekcjami"
  }
}
</i18n>
