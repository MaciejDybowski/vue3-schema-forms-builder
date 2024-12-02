<template>
  <key-property v-model="model.key"/>
  <col-property v-model="model.layout.cols"/>
</template>

<script setup lang="ts">
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import {computed} from "vue";

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
