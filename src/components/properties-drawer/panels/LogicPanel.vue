<template>
  <expansion-panel
    :active="active"
    :title="t('logic.title')"
    value="logic"
  >
    <if-property
      v-if="showIfControl"
      v-model="model.layout.if"/>
    <hide-property
      v-if="showHideControl"
      v-model="model.layout.hide"/>

    <hide-property-expression
      v-if="showHideControl"
      :model-value="model.layout.hide"
      @update:model-value="updateExpressionHide"
    />

    <read-only-property
      v-if="showReadOnlyControl"
      v-model="model.layout.props.readonly"
    />
    <read-only-expression-property
      v-if="showReadOnlyControl"
      :model-value="model.layout.props.readonly"
      @update:model-value="updateExpressionReadonly"
    />
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import ReadOnlyExpressionProperty from "@/components/properties-drawer/atoms/ReadOnlyExpressionProperty.vue";
import HideProperty from "@/components/properties-drawer/atoms/HideProperty.vue";
import HidePropertyExpression from "@/components/properties-drawer/atoms/HidePropertyExpression.vue";

const {t} = useBuilderLocale();
const props = withDefaults(defineProps<{
  active?: boolean
  showIfControl?: boolean
  showHideControl?: boolean
  showReadOnlyControl?: boolean
}>(), {
  active: false,
  showIfControl: true,
  showHideControl: true,
  showReadOnlyControl: true,
})

const {active, showIfControl, showHideControl, showReadOnlyControl} = props

const model = defineModel<any>()

function updateExpressionReadonly(val: string) {
  if (!val) {
    model.value.layout.props['readonly'] = false
  } else {
    model.value.layout.props['readonly'] = val
  }
}

function updateExpressionHide(val: string) {
  if (!val) {
    model.value.layout.hide = false
  } else {
    model.value.layout.hide = val
  }
}
</script>

<style lang="scss" scoped>
</style>
