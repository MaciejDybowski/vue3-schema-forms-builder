<template>

  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >
    <expansion-panel
      :active="panels.includes('general')"
      title="General"
      value="general"
    >
      <key-property v-model="model.key"/>
      <label-property v-model="model"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <fill-row-property v-model="model.layout.fillRow"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
    </expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";

const panels = ref<string[]>(["general", "logic"])
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


<style lang="scss" scoped>

</style>
