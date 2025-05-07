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
      :active="panels.includes('fieldProps')"
      title="Field properties"
      value="fieldProps"
    >
      <horizontal-radio-or-checkbox-property
        v-if="component == 'checkbox' || component == 'radio-button'"
        v-model="model.layout.props.inline"
      />
      <checkbox-general
        v-if="component == 'checkbox'"
        v-model="model.layout.props.multiple"
        :label="t('multipleProps')"
      />
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
      :active="panels.includes('source')"
      title="Source"
      value="source"
    >
      <simple-source-property v-model="source"/>
    </expansion-panel>
    <validation-configuration :active="panels.includes('validations')"/>
    <event-configuration :active="panels.includes('events')"/>
  </v-expansion-panels>

</template>

<script lang="ts" setup>

import {computed, ComputedRef, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import SimpleSourceProperty from "@/components/properties-drawer/atoms/SimpleSourceProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import {FromElementComponent} from "@/models/FromElementComponent";
import HorizontalRadioOrCheckboxProperty
  from "@/components/properties-drawer/atoms/HorizontalRadioOrCheckboxProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import CheckboxGeneral from "@/components/properties-drawer/atoms/CheckboxGeneral.vue";
import {useI18n} from "vue-i18n";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import EventConfiguration from "@/components/properties-drawer/atoms/EventConfiguration.vue";

const panels = ref<string[]>(["general", "source"])
const useBuilderStateStore = useBuilderState()
const {t} = useI18n()
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

const component: ComputedRef<FromElementComponent> = computed(() => {
  return model.value.layout.component
})
</script>


<style lang="scss" scoped>

</style>


<i18n lang="json">
{
  "en": {
    "multipleProps": "Multiple values"
  },
  "pl": {
    "multipleProps": "Dozwolone wiele wartości"
  }
}
</i18n>
