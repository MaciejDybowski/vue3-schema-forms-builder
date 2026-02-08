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
        <v-list-item>
          <v-switch
            v-model="model.type"
            :label="model.type=='int' ? t('int') : t('float')"
            class="mx-2"
            false-value="float"
            hide-details="auto"
            true-value="int"
          />
        </v-list-item>

        <text-property-wrapper
          v-if="model.type=='float'"
          v-model="model.precision"
          :label="t('precision')"
          type="number"
        />
        <text-property-wrapper
          v-if="model.type=='float'"
          v-model="model.precisionMin"
          :label="t('precisionMin')"
          type="number"
        />

        <select-general
          v-if="model.type=='float'"
          v-model="model.roundOption"
          :items="[{value: 'ceil', title: t('ceilOptionLabel')}, {value:'floor', title: t('floorOptionLabel')}, {value:'round', title: t('roundOptionLabel')}]"
          :label="t('roundLabel')"
          :return-object="false"
          clearable
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

    <expressions-panel
      v-model="model"
      :active="panels.includes('expressions')"
    />

    <vuetify-input-props
      v-model="model"
      :active="panels.includes('fieldProps')"
    />

    <validations-panel
      v-model="model"
      :active="panels.includes('validations')"
    />

    <event-configruation-panel
      :active="panels.includes('events')"
    />
  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";

import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import ExpressionsPanel from "@/components/properties-drawer/panels/ExpressionsPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";
import VuetifyInputProps from "@/components/properties-drawer/panels/VuetifyInputProps.vue";

const panels = ref<string[]>(["general", "logic", "expressions"])
const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const {t} = useBuilderLocale()
</script>

<style lang="scss" scoped>
</style>
