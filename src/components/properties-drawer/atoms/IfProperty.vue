<template>
  <v-list-item>
    <v-textarea
      v-model="modelValue"
      :label="t('ifProperty')"
      class="pt-2"
      v-bind="style.inputStyle.value"
      rows="1"
      :auto-grow="true"
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
    "ifProperty": "Conditional rendering"
  },
  "pl": {
    "ifProperty": "Warunek widoczności"
  }
}
</i18n>
