<template>
  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >
    <expansion-panel
      :active="panels.includes('general')"
      title="General"
      value="general"
    >
      <key-property v-model="model.key"/>
      <label-property v-model="model"/>
      <default-value-property/>


      <switch-general
        :model-value="model.range != null"
        label="Range"
        @update:model-value="value => value ? model.range = [] : model.range = null"
      />

      <number-general
        v-if="model.range != null"
        v-model="model.range[0]"
        label="Min Year"
      />
      <number-general
        v-if="model.range != null"
        v-model="model.range[1]"
        label="Max Year"/>

    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <offset-property v-model="model.layout.offset"/>
      <fill-row-property v-model="model.layout.fillRow"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
      <read-only-property v-model="model.layout.props.readonly"/>
      <switch-general
        v-model="model.layout.hide"
        :label="model.layout.hide ? t('hide') : t('visible')"
      />
    </expansion-panel>

    <validation-configuration :active="panels.includes('validations')"/>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import {useI18n} from "vue-i18n";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import NumberGeneral from "@/components/properties-drawer/atoms/NumberGeneral.vue";

const panels = ref<string[]>(["general", "logic", "validations"])

const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const {t} = useI18n()
</script>

<style lang="scss" scoped>

</style>
