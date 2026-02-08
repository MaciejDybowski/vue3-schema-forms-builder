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
import { useI18n } from "vue-i18n";

const { active } = withDefaults(defineProps<{
  active?: boolean;
}>(), {
  active: false
});

const model = defineModel<any>();
const {t} = useI18n({ useScope: 'global' });
</script>

<style scoped lang="scss">
</style>
