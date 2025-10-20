<template>
  <expansion-panel
    v-if="component !== 'select'"
    :active="active"
    :title="t('fieldProperties')"
    value="fieldProps"
  >
    <boolean-checkbox-property-wrapper
      v-model="model.layout.props.inline"
      :label="t('horizontalLayout')"
    />

    <boolean-checkbox-property-wrapper
      v-if="component === 'checkbox'"
      v-model="model.layout.props.multiple"
      :label="t('multipleProps')"
    />
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import {useI18n} from "vue-i18n";

const props = withDefaults(defineProps<{
  active?: boolean
  component: string
}>(), {
  active: false
})

const model = defineModel<any>()
const {t} = useI18n()
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "fieldProperties": "Field properties",
    "horizontalLayout": "Horizontal layout",
    "multipleProps": "Allow multiple selections"
  },
  "pl": {
    "fieldProperties": "Właściwości pola",
    "horizontalLayout": "Układ poziomy",
    "multipleProps": "Zezwól na wiele zaznaczeń"
  }
}
</i18n>
