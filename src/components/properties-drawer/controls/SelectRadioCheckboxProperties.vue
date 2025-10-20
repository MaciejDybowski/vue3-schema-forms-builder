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

    <select-radio-checkbox-props-panel
      v-model="model"
      :active="panels.includes('fieldProps')"
      :component="component"
    />

    <source-panel
      v-model="model"
      :active="panels.includes('source')"
      :component="component"
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

import {computed, ComputedRef, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import {FromElementComponent} from "@/models/FromElementComponent";
import {useI18n} from "vue-i18n";
import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";
import SelectRadioCheckboxPropsPanel from "@/components/properties-drawer/panels/SelectRadioCheckboxPropsPanel.vue";
import SourcePanel from "@/components/properties-drawer/panels/SourcePanel.vue";

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
