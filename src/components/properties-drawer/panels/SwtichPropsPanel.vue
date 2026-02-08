<template>
  <expansion-panel
    :active="active"
    :title="t('properties')"
    value="fieldProps"
  >
    <text-property-wrapper
      v-model="model.layout.props['color']"
      :label="t('color')"
    />

    <false-value-mapping
      v-model="model.layout.props['false-value']"
      :label="t('falseValueMapping')"
    />

    <true-value-mapping
      v-model="model.layout.props['true-value']"
      :label="t('trueValueMapping')"
    />
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import TrueValueMapping from "@/components/properties-drawer/atoms/TrueValueMapping.vue";
import FalseValueMapping from "@/components/properties-drawer/atoms/FalseValueMapping.vue";
import { useI18n } from "vue-i18n";

const { active } = defineProps<{
  active: boolean;
}>();

const model = defineModel<any>();
const {t} = useI18n({ useScope: 'global' });
</script>

<style scoped lang="scss"></style>
