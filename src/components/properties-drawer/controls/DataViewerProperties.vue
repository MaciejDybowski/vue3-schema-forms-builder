<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <data-viewer-type-property v-model="model.type"/>
  <value-mapping-property v-model="model.valueMapping"/>
  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <offset-property v-model="model.layout.offset"/>
  <source-property
    v-if="model.type=='dictionary'"
    v-model="source"
  />
  <calculatiuon-property v-model="model.calculations"/>
  <if-property v-model="model.layout.if"/>
</template>

<script setup lang="ts">

import {useBuilderState} from "@/pinia/stores/useBuilderState";
import {computed} from "vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import ValueMappingProperty from "@/components/properties-drawer/atoms/ValueMappingProperty.vue";
import SourceProperty from "@/components/properties-drawer/atoms/SourceProperty.vue";
import CalculatiuonProperty from "@/components/properties-drawer/atoms/CalculatiuonProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import DataViewerTypeProperty from "@/components/properties-drawer/atoms/DataViewerTypeProperty.vue";

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

</script>

<style scoped lang="scss">

</style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
