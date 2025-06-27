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
      <read-only-property v-model="model.layout.props.readonly"/>
      <if-property v-model="model.layout.if"/>
    </expansion-panel>


    <validation-configuration :active="panels.includes('validations')">
      <template #afterRequired>
        <number-property-wrapper
          v-model="model.layout.props['counter']"
          :label="t('counter')"
        />
      </template>
    </validation-configuration>

  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/offset/OffsetProperty.vue";
import {useI18n} from "vue-i18n";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";

const panels = ref<string[]>(["general", "logic", "validations"])
const {t} = useI18n()
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

<i18n lang="json">
{
  "en": {
    "validations": "Validations",
    "counter": "Counter of letters"
  },
  "pl": {
    "validations": "Walidacje",
    "counter": "Licznik liter"
  }
}
</i18n>

