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
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";

const modelValue = defineModel<any>({
  default: () => {
  }
})

const {t} = useBuilderLocale()


</script>

<style lang="scss" scoped>

</style>
