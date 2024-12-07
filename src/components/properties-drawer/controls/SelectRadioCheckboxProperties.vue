<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <default-value-property/>
  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <if-property v-model="model.layout.if"/>
  <horizontal-radio-or-checkbox-property
    v-if="component == 'checkbox' || component == 'radio-button'"
    v-model="model.layout.props.inline"
  />
  <checkbox-general
    v-if="component == 'checkbox'"
    :label="t('multipleProps')"
    v-model="model.layout.props.multiple"
  />
  <read-only-property v-model="model.layout.props.readonly"/>
  <simple-source-property v-model="source"/>
  <validation-configuration/>

</template>


<script lang="ts" setup>

import {computed, ComputedRef} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import SimpleSourceProperty from "@/components/properties-drawer/atoms/SimpleSourceProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import {FromElementComponent} from "@/models/FromElementComponent";
import HorizontalRadioOrCheckboxProperty
  from "@/components/properties-drawer/atoms/HorizontalRadioOrCheckboxProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import CheckboxGeneral from "@/components/properties-drawer/atoms/CheckboxGeneral.vue";
import {useI18n} from "vue-i18n";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";

const useBuilderStateStore = useBuilderState()
const {t} = useI18n()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const source = computed({
  get() {
    if (!model.value.source) {
      return {}
    } else {
      return model.value.source
    }
  },
  set(val) {
    useBuilderStateStore.setKeyInConfiguredField("source", val)
  }
})

const component: ComputedRef<FromElementComponent> = computed(() => {
  return model.value.layout.component
})
</script>


<style lang="scss" scoped>

</style>


<i18n lang="json">
{
  "en": {
    "multipleProps": "Multiple values"
  },
  "pl": {
    "multipleProps": "Dozwolone wiele wartości"

  }
}
</i18n>
