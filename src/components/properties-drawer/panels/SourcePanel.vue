<template>
  <expansion-panel
    :active="active"
    :title="t('sourceTitle')"
    value="source"
  >
    <simple-source-property v-model="model.source" />
  </expansion-panel>
</template>

<script setup lang="ts">
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import SimpleSourceProperty from "@/components/properties-drawer/atoms/SimpleSourceProperty.vue";
import { useBuilderLocale } from "@/composables/useBuilderLocale";

const { active } = withDefaults(defineProps<{
  active?: boolean;
}>(), {
  active: false
});

const model = defineModel<any>();
const {t} = useBuilderLocale();
</script>

<style scoped lang="scss">
</style>
