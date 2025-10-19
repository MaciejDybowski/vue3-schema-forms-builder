<template>
  <expansion-panel
    :active="active"
    :title="t('logic.title')"
    value="logic"
  >
    <if-property v-model="model.layout.if"/>
    <read-only-property v-model="model.layout.props.readonly"/>
    <visible-property v-model="model.layout.hide"/>
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useI18n} from "vue-i18n";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import VisibleProperty from "@/components/properties-drawer/atoms/VisibleProperty.vue";

const {t} = useI18n();
const {active} = defineProps<{
  active: boolean;
}>()
const model = defineModel<any>()
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "logic": {
      "title": "Logic"
    }
  },
  "pl": {
    "logic": {
      "title": "Logika"
    }
  }
}
</i18n>
