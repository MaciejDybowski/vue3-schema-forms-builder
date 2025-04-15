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

      <select-general
        v-model="model.mode"
        :items="[{value: 'visibility', title: t('visibility')}]"
        :return-object="false"
        clearable
        label="Switch Mode"
      />
      <v-alert
        icon="mdi-information-outline"
        v-if="model.mode=='visibility'"
        variant="outlined"
        text="Value of switch is internal"
        color="info"
        density="compact"
        class="mx-4"
      />

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
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('fieldProps')"
      title="Properties"
      value="fieldProps"
    >
      <textfield-general
        v-model="model.layout.props['color']"
        :label="t('color')"
      />

      <false-value-mapping v-model="model.layout.props['false-value']"/>
      <true-value-mapping v-model="model.layout.props['true-value']"/>
    </expansion-panel>

  </v-expansion-panels>

</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import {useI18n} from "vue-i18n";
import FalseValueMapping from "@/components/properties-drawer/atoms/FalseValueMapping.vue";
import TrueValueMapping from "@/components/properties-drawer/atoms/TrueValueMapping.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";

const useBuilderStateStore = useBuilderState()
const {t} = useI18n()
const panels = ref<string[]>(["general", "logic", "fieldProps"])
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

<i18n lang="json">
{
  "en": {
    "color": "Color",
    "valueMapping": "Value mapping",
    "visibility": "Visibility"
  },
  "pl": {
    "color": "Kolor",
    "valueMapping": "Mapowanie wartości",
    "visibility": "Tylko widoczność"
  }
}
</i18n>
