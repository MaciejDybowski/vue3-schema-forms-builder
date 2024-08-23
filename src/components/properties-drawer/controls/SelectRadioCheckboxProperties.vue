<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <required-property v-model="model.required"/>
  <read-only-property v-model="model.layout.props.readOnly"/>
  <horizontal-radio-or-checkbox-property
    v-if="component == 'checkbox' || component == 'radio-button'"
    v-model="model.layout.props.inline"
  />
  <simple-source-property v-model="source"/>


</template>


<script lang="ts" setup>

import {computed, ComputedRef} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import SimpleSourceProperty from "@/components/properties-drawer/atoms/SimpleSourceProperty.vue";
import RequiredProperty from "@/components/properties-drawer/atoms/RequiredProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import {FromElementComponent} from "@/models/FromElementComponent";
import HorizontalRadioOrCheckboxProperty
  from "@/components/properties-drawer/atoms/HorizontalRadioOrCheckboxProperty.vue";

const useBuilderStateStore = useBuilderState()
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
