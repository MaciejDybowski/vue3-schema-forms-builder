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
        <default-value-property/>
        <select-general
          v-model="model.variant"
          :items="[{value: 'combobox', title: t('combobox')}, {value:'list', title: t('list')}]"
          :label="t('variant')"
          :return-object="false"
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
      title="Source"
      value="source"
    >
      <source-property v-model="source"/>
    </expansion-panel>

    <validations-panel
      v-model="model"
      :active="panels.includes('validations')"
    />

  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import SourceProperty from "@/components/properties-drawer/atoms/SourceProperty.vue";
import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";

const {t} = useBuilderLocale()
const panels = ref<string[]>(["general", "layout", "source"])

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
    if (!model.value.source) {
      return {}
    } else {
      return model.value.source
    }
  },
  set(val) {
    useBuilderStateStore.setKeyInConfiguredField("source", val)
  }
})
</script>

<style lang="scss" scoped>

</style>
