<template>
  <v-list-item>
    <v-textarea
      v-model="modelValue.builder_url"
      :label="t('urlKey')"
      v-bind="style.inputStyle.value"
      class="pt-2"
      auto-grow
      rows="3"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const modelValue = defineModel<any>({
  default: () => {
  }
})
const style = useStyle()

const {t} = useI18n()


</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "groupFilterProperty": "Group",
    "filterHint": "Group names separated by coma",
    "urlKey": "URL"
  },
  "pl": {
    "groupFilterProperty": "Grupa",
    "filterHint": "Nazwa grupy oddzielana przecinkami",
    "urlKey": "Specjalny URL"
  }
}
</i18n>
