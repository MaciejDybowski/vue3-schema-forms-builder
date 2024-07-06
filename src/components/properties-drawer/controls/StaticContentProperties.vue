<template>
  <key-property v-model="model.key"/>
  <content-propery v-model="model.content"/>
  <col-property v-model="model.layout.cols"/>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import ContentPropery from "@/components/properties-drawer/atoms/ContentPropery.vue";


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
