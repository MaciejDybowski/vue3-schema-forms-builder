<template>
  <v-list-item>
    <v-switch
      class="mx-2"
      :label="t('fillRowProperty')"
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
    "fillRowProperty": "Fill row to the end"
  },
  "pl": {
    "fillRowProperty": "Wypełnij do końca wiersza"
  }
}
</i18n>
