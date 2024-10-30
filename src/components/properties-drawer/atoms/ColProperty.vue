<template>
  <v-list-item class="pb-0">

    <col-btn-toggle
      v-model:breakpoint-larger="modelValue.xxl"
      v-model:breakpoint-smaller="modelValue.xl"
      v-model:breakpoint-smallest="modelValue.lg"
      :label="t('size.desktop')"
    />
    <col-btn-toggle
      v-model:breakpoint-larger="modelValue.md"
      v-model:breakpoint-smaller="modelValue.sm"
      v-model:breakpoint-smallest="modelValue.sm"
      :label="t('size.tablet')"
    />
    <col-btn-toggle
      v-model:breakpoint-larger="modelValue.xs"
      v-model:breakpoint-smaller="modelValue.xs"
      v-model:breakpoint-smallest="modelValue.xs"
      :label="t('size.mobile')"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import ColBtnToggle from "@/components/properties-drawer/atoms/ColBtnToggle.vue";

const modelValue = defineModel<{
  xxl: number,
  xl: number,
  lg: number,
  md: number,
  sm: number,
  xs: number
}>({
  default: {}
})

const {t} = useI18n()

</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "size": {
      "desktop": "Size on desktop and laptops",
      "tablet": "Size on tablets",
      "mobile": "Size on mobile phones"
    }
  },
  "pl": {
    "size": {
      "desktop": "Szerokość pola - ekran typu monitor",
      "tablet": "Szerokość pola - ekran typu tablet",
      "mobile": "Szerokość pola - ekran typu smartfon"
    }
  }
}
</i18n>
