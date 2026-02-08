<template>
  <expansion-panel
    :active="active"
    :title="t('general.title')"
    value="general"
  >
    <path-property/>
    <key-property v-model="model.key"/>
    <slot name="afterKey"></slot>
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useI18n} from "vue-i18n";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import PathProperty from "@/components/properties-drawer/atoms/PathProperty.vue";

const {t} = useI18n({ useScope: 'global' });
const {active} = defineProps<{
  active: boolean;
}>()
const model = defineModel<any>()
</script>

<style lang="scss" scoped>
</style>
