<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <col-property v-model="model.layout.cols"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <required-property v-model="model.required"/>
  <read-only-property v-model="model.layout.props.readOnly"/>
  <source-property v-model="source"/>

</template>

<script setup lang="ts">

import {useBuilderState} from "@/pinia/stores/useBuilderState";
import {computed} from "vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import TypeProperty from "@/components/properties-drawer/atoms/TypeProperty.vue";
import ValueMappingProperty from "@/components/properties-drawer/atoms/ValueMappingProperty.vue";
import SourceProperty from "@/components/properties-drawer/atoms/SourceProperty.vue";
import CalculatiuonProperty from "@/components/properties-drawer/atoms/CalculatiuonProperty.vue";
import RequiredProperty from "@/components/properties-drawer/atoms/RequiredProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";

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
    if(!model.value.source){
      return {}
    } else {
      return  model.value.source
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
