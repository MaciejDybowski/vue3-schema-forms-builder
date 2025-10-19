<template>
  <expansion-panel
    :active="active"
    :title="t('logic.title')"
    value="logic"
  >
    <if-property v-model="model.layout.if"/>
    <visible-property v-model="model.layout.hide"/>
    <read-only-property v-model="model.layout.props.readonly"/>
    <read-only-expression-property
      :model-value="model.layout.props.readonly"
      @update:model-value="updateExpressionReadonly"
    />
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useI18n} from "vue-i18n";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import VisibleProperty from "@/components/properties-drawer/atoms/VisibleProperty.vue";
import ReadOnlyExpressionProperty from "@/components/properties-drawer/atoms/ReadOnlyExpressionProperty.vue";

const {t} = useI18n();
const {active} = defineProps<{
  active: boolean;
}>()
const model = defineModel<any>()

function updateExpressionReadonly(val: string) {
  if (!val) {
    model.value.layout.props['readonly'] = false
  } else {
    model.value.layout.props['readonly'] = val
  }
}
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
