<template>
  <key-property v-model="model.key"/>
  <col-property v-model="model.layout.cols"/>
  <duplicated-section-button-property v-model="model.layout.options.addBtnText"/>
  <duplicated-section-divider-property v-model="model.layout.options.showDivider"/>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import DuplicatedSectionButtonProperty from "@/components/properties-drawer/atoms/DuplicatedSectionButtonProperty.vue";
import DuplicatedSectionDividerProperty
  from "@/components/properties-drawer/atoms/DuplicatedSectionDividerProperty.vue";

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
