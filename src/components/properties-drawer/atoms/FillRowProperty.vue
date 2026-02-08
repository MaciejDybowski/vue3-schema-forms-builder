<template>
  <boolean-checkbox-property-wrapper
    v-model="modelValue"
    :label="t('fillRowProperty')"
  >
    <template #append>
      <v-tooltip
        location="left"
        width="300"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
        <span>{{ t('fillRowInfo') }}</span>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const modelValue = defineModel()

const {t} = useI18n({ useScope: 'global' })
</script>

<style lang="scss" scoped>
</style>
