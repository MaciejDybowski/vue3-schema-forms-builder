<template>
  <v-expansion-panels
    v-model="panels"
    elevation="0"
    multiple
  >
    <conversion-panel :active="panels.includes('conversion')">
      <select-general
        v-model="model.layout.component"
        :clearable="false"
        :items="[
          {value: 'text-field', title: t('conversion.text')},
          {value: 'text-area', title: t('conversion.textarea')},
          {value: 'text-switch-field', title:t('conversion.textSwitch')},
          {value: 'data-viewer', title:t('conversion.dataViewer')},
       ]"
        :label="t('conversion.label')"
        :return-object="false"
      />
    </conversion-panel>

    <general-panel
      v-model="model"
      :active="panels.includes('general')"
    >
      <template #afterKey>
        <label-property v-model="model"/>
        <default-value-property/>
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
import {useI18n} from "vue-i18n";
import ValidationConfiguration from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import ConversionPanel from "@/components/properties-drawer/panels/ConversionPanel.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";

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
    "conversion": {
      "label": "Field",
      "text": "Text field",
      "textarea": "Text area",
      "textSwitch": "Text ➞ input field",
      "dataViewer": "Data viewer"
    },
    "counter": "Counter of letters"
  },
  "pl": {
    "conversion": {
      "label": "Pole",
      "text": "Pole tekstowe",
      "textarea": "Obszar tekstowy",
      "textSwitch": "Pole tekst ➞ input",
      "dataViewer": "Pole odczytu"
    },
    "counter": "Licznik liter"
  }
}
</i18n>

