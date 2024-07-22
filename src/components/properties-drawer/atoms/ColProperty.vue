<template>
  <v-list-item class="pb-0">

    <col-btn-toggle
      :label="t('size.desktop')"
      v-model:breakpoint-larger="modelValue.xxl"
      v-model:breakpoint-smaller="modelValue.xl"
    />
    <col-btn-toggle
      :label="t('size.tablet')"
      v-model:breakpoint-larger="modelValue.lg"
      v-model:breakpoint-smaller="modelValue.md"
    />
    <col-btn-toggle
      :label="t('size.mobile')"
      v-model:breakpoint-larger="modelValue.sm"
      v-model:breakpoint-smaller="modelValue.xs"
    />
  </v-list-item>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import ColBtnToggle from "@/components/properties-drawer/atoms/ColBtnToggle.vue";

const modelValue = defineModel()

const {t} = useI18n()

</script>

<style scoped lang="scss">

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
