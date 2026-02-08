<template>
  <text-property-wrapper
    v-model="model.layout.cellClass"
    :label="t('cellClassProperty')"
  >
    <template #append-inner>
      <v-tooltip
        location="left"
        width="300"
      >
        <template #activator="{ props }">
          <v-icon v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
        <span>{{ t('cellClassInfo') }}</span>
      </v-tooltip>
    </template>
  </text-property-wrapper>
</template>

<script lang="ts" setup>
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";

const {t} = useBuilderLocale();
const model = defineModel<any>();
</script>

<style lang="scss" scoped>
</style>
