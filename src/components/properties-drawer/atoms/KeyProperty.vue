<template>
  <text-property-wrapper
    v-model="modelValue"
    :label="t('modelKey')"
  />
</template>

<script lang="ts" setup>
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import {useStyle} from "@/main";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const modelValue = defineModel()
const style = useStyle()

const {t} = useBuilderLocale();

</script>

<style lang="scss" scoped>
</style>
