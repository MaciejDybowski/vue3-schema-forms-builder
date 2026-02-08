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

const {t} = useI18n({ useScope: 'global' })


</script>

<style lang="scss" scoped>

</style>
