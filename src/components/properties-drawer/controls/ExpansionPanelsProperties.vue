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

    <expansion-panels
      :active="panels.includes('fieldProps')"
      :panels="model.panels"
      @update:panels="(val) => model.panels = val"
    />

  </v-expansion-panels>
</template>

<script lang="ts" setup>

import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import {computed, ref} from "vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import ExpansionPanels from "@/components/properties-drawer/panels/ExpansionPanels.vue";

const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const panels = ref<string[]>(["general", "fieldProps"])
const {t} = useBuilderLocale()

</script>


<style lang="scss" scoped>

</style>
