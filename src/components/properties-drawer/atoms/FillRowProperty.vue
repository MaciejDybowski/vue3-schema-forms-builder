<template>
  <v-list-item>
    <v-switch
      v-model="modelValue"
      :label="t('fillRowProperty')"
      class="mx-2"
      hide-details="auto"
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
    "fillRowProperty": "Fill row to the end"
  },
  "pl": {
    "fillRowProperty": "Wypełnij do końca wiersza"
  }
}
</i18n>
