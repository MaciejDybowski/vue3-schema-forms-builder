<template>
  <text-property-wrapper
    v-model="modelValue.builder_url"
    :label="t('urlKey')"
    :rows="3"
  />

  <boolean-switch-property-wrapper
    v-model="modelValue.singleOptionAutoSelect"
    :label="t('singleOptionAutoSelect')"
  />
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";

const modelValue = defineModel<any>({
  default: () => {
  }
})

const {t} = useI18n()


</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "groupFilterProperty": "Group",
    "filterHint": "Group names separated by coma",
    "urlKey": "URL",
    "singleOptionAutoSelect": "Auto select when single"
  },
  "pl": {
    "groupFilterProperty": "Grupa",
    "filterHint": "Nazwa grupy oddzielana przecinkami",
    "urlKey": "Specjalny URL",
    "singleOptionAutoSelect": "Auto wybieranie, gdy pojedyncza wartość"
  }
}
</i18n>
