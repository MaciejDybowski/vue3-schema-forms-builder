<template>
  <v-list-item>
    <v-text-field
      class="pt-2"
      :label="t('ifProperty')"
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
    "ifProperty": "Conditional rendering"
  },
  "pl": {
    "ifProperty": "Warunek widoczności"
  }
}
</i18n>
