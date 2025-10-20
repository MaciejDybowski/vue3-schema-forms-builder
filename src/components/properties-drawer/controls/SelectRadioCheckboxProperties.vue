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
          v-model="model.layout.component"
          :clearable="false"
          :items="[
       {value: 'radio-button', title: 'Radio'},
       {value:'checkbox', title: 'Checkbox'},
       {value:'select', title: 'Select'}
       ]"
          :return-object="false"
          label="Component"
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
      v-if="component !='select'"
      :active="panels.includes('fieldProps')"
      title="Field properties"
      value="fieldProps"
    >


      <boolean-checkbox-property-wrapper
        v-model="model.layout.props.inline"
        :label="t('horizontalLayout')"
      />


      <boolean-checkbox-property-wrapper
        v-if="component == 'checkbox'"
        v-model="model.layout.props.multiple"
        :label="t('multipleProps')"
      />
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
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import SimpleSourceProperty from "@/components/properties-drawer/atoms/SimpleSourceProperty.vue";
import {FromElementComponent} from "@/models/FromElementComponent";
import {useI18n} from "vue-i18n";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import EventConfiguration from "@/components/properties-drawer/atoms/EventConfiguration.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";

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
    "horizontalLayout": "Set horizontal",
    "multipleProps": "Multiple values"
  },
  "pl": {
    "horizontalLayout": "Ułóż horyzontalnie",
    "multipleProps": "Dozwolone wiele wartości"
  }
}
</i18n>
