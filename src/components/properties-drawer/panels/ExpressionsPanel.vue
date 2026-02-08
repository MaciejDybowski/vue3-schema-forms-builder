<template>
  <expansion-panel
    :active="active"
    :title="t('expressions.title')"
    value="expressions"
  >
    <expression-property
      v-if="showExpression"
      v-model="model.expression"
    />

    <calculation-property
      v-if="showCalculation"
      v-model="model.calculation"
    />
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import ExpressionProperty from "@/components/properties-drawer/atoms/ExpressionProperty.vue";
import CalculationProperty from "@/components/properties-drawer/atoms/CalculationProperty.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";

const {t} = useBuilderLocale();

const {active, showExpression, showCalculation} = withDefaults(
  defineProps<{
    active: boolean;
    showExpression?: boolean;
    showCalculation?: boolean;
  }>(),
  {
    active: false,
    showExpression: true,
    showCalculation: true,
  }
);

const model = defineModel<any>();
</script>

<style lang="scss" scoped></style>
