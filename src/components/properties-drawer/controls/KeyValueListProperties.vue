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
        <text-property-wrapper
          v-model="model.sourcePath"
          :label="t('sourcePathLabel')"
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
      :show-read-only-control="false"
    />
    <key-value-list-headers-panel
      v-model="model"
      :active="panels.includes('headers')"
    />


  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import KeyValueListHeadersPanel from "@/components/properties-drawer/panels/KeyValueListHeadersPanel.vue";
import {useI18n} from "vue-i18n";


const panels = ref<string[]>(["general", "logic", "headers"])

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
