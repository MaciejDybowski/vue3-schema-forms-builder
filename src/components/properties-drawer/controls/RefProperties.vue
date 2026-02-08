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
      <template #afterKey>
        <text-property-wrapper
          v-model="model.ref"
          :label="t('reference')"/>
      </template>
    </general-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import {useI18n} from "vue-i18n";

const panels = ref<string[]>(["general"])
const useBuilderStateStore = useBuilderState()
const {t} = useI18n({ useScope: 'global' })
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
