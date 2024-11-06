<template>
  <v-list-item>
    <v-textarea
      v-model="modelValue"
      :label="t('contentProperty')"
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

const style = useStyle();

const modelValue = defineModel()


const {t} = useI18n()
</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "contentProperty": "Text value"
  },
  "pl": {
    "contentProperty": "Tekst"
  }
}
</i18n>
