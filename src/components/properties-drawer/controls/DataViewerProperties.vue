<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <type-property v-model="model.type"/>
  <value-mapping-property v-model="model.valueMapping"/>
  <col-property v-model="model.layout.cols"/>
  <source-property
    v-model="model.source"
  />
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

const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
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
