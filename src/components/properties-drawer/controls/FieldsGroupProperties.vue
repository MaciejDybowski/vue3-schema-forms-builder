<template>
  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >
    <general-panel
      v-model="model"
      :active="panels.includes('general')"
    >
    </general-panel>

    <layout-panel
      v-model="model"
      :active="panels.includes('layout')"
    />

    <logic-panel
      v-model="model"
      :active="panels.includes('logic')"
    />
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import {useBuilderState} from "@/pinia/useBuilderState";
import {computed, ref} from "vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";

;

const panels = ref<string[]>(["general", "layout"])
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
