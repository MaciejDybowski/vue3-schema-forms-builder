<template>
  <expansion-panel
    :active="active"
    :title="t('fieldProperties')"
    value="fieldProps"
  >

    <hint-property v-model="model.layout.props"/>
    <prefix-property v-model="model.layout.props"/>
    <suffix-property v-model="model.layout.props"/>

    <boolean-checkbox-property-wrapper
      v-model="model.layout.props['persistent-hint']"
      :hint="t('persistentHintDescription')"
      :label="t('persistentHint')"
    />
    <text-property-wrapper
      :hint="t('persistentHintIfExpressionDescription')"
      :label="t('persistentHintIfExpression')"
      :model-value="model.layout.props['persistent-hint']"
      @update:model-value="updateExpressionPersistentHint"
    />

  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import HintProperty from "@/components/properties-drawer/atoms/HintProperty.vue";
import PrefixProperty from "@/components/properties-drawer/atoms/PrefixProperty.vue";
import SuffixProperty from "@/components/properties-drawer/atoms/SuffixProperty.vue";

const props = withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: false
})

const model = defineModel<any>()
const {t} = useBuilderLocale()

function updateExpressionPersistentHint(val: string | boolean) {
  model.value.layout.props['persistent-hint'] = val || false
}
</script>

<style lang="scss" scoped>
</style>
