<template>
  <expansion-panel
    :active="active"
    :title="t('fieldProps.title')"
    value="fieldProps"
  >
    <text-property-wrapper
      v-model="model.src"
      :label="t('fieldProps.src')"
    >
      <template #append-inner>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('fieldProps.srcInfo') }}</span>
        </v-tooltip>
      </template>
    </text-property-wrapper>

    <text-property-wrapper
      v-model="model.layout.props['aspect-ratio']"
      :label="t('fieldProps.aspectRatio')"
    >
      <template #append-inner>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('fieldProps.aspectRatioInfo') }}</span>
        </v-tooltip>
      </template>
    </text-property-wrapper>

    <text-property-wrapper
      v-model="model.layout.props['width']"
      :label="t('fieldProps.width')"
    />


    <text-property-wrapper
      v-model="model.layout.props['height']"
      :label="t('fieldProps.height')"/>

    <boolean-checkbox-property-wrapper
      v-model="model.layout.props['cover']"
      :label="t('fieldProps.cover')"
    >
      <template #append>
        <v-tooltip location="left" width="280">
          <template #activator="{ props }">
            <v-icon v-bind="props">mdi-information-outline</v-icon>
          </template>
          <span>{{ t('fieldProps.coverInfo') }}</span>
        </v-tooltip>
      </template>
    </boolean-checkbox-property-wrapper>
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const {t} = useBuilderLocale();
const {active} = defineProps<{
  active: boolean
}>();
const model = defineModel<any>();
</script>

<style lang="scss" scoped></style>
