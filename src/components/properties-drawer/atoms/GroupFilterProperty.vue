<template>
  <v-list-item>
    <v-text-field
      v-model="modelValue"
      :hint='t("filterHint")'
      :label="t('groupFilterProperty')"
      class="pt-2"
      persistent-hint
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const modelValue = defineModel({})
const style = useStyle()

const {t} = useI18n()


</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "groupFilterProperty": "Group",
    "filterHint": "Group names separated by coma"
  },
  "pl": {
    "groupFilterProperty": "Grupa",
    "filterHint": "Nazwa grupy oddzielana przecinkami"
  }
}
</i18n>
