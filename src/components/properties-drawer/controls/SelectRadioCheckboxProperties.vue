<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <col-property v-model="model.layout.cols"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <required-property v-model="model.required"/>
  <read-only-property v-model="model.layout.props.readOnly"/>
  <simple-source-property v-model="source" />
</template>



<script setup lang="ts">

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import SimpleSourceProperty from "@/components/properties-drawer/atoms/SimpleSourceProperty.vue";
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
