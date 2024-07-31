<template>
  <v-list-item>
    <v-checkbox
      v-model="modelValue"
      :label="t('readOnlyProperty')"
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
    "readOnlyProperty": "Read only"
  },
  "pl": {
    "readOnlyProperty": "Pole do odczytu"
  }
}
</i18n>
