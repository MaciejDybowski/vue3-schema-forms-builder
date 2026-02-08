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
        <label-property v-model="model"/>

        <boolean-checkbox-property-wrapper
          v-model="model.showLabel"
          :label="t('showLabel')"
        />

        <boolean-checkbox-property-wrapper
          v-model="model.showUserColumn"
          :label="t('showUserColumn')"
        />
      </template>
    </general-panel>


    <layout-panel
      v-model="model"
      :active="panels.includes('layout')"
    />

    <logic-panel
      v-model="model"
      :active="panels.includes('logic')"
    />


    <expansion-panel
      :active="panels.includes('source')"
      :title="t('source')"
      value="source"
    >
      <text-property-wrapper
        v-model="urlComputed"
        :label="t('sourceUrl')"/>
    </expansion-panel>

    <scheduler-grid-panel
      v-model="model.legend"
      :active="panels.includes('legend')"
    />


  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import SchedulerGridPanel from "@/components/properties-drawer/panels/SchedulerGridPanel.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";

const panels = ref<string[]>(["general", "logic", "legend"])

const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const urlComputed = computed({
  get(){
    return model.value?.source?.builder_url || null
  },
  set(val) {
    if(!model.value.source){
      model.value.source = {}
    }
    model.value.source.builder_url = val
  }
})

const {t} = useBuilderLocale()

onMounted(() => {
  if (model.value['showLabel'] == undefined) {
    model.value['showLabel'] = true
  }
  if (model.value['showUserColumn'] == undefined) {
    model.value['showUserColumn'] = true
  }
})

</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>
