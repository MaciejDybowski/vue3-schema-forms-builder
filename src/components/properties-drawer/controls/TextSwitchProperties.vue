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
        <content-propery v-model="model"/>

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


    <expressions-panel
      v-model="model"
      :active="panels.includes('expressions')"
      :show-calculation="false"
    />

    <expansion-panel
      :active="panels.includes('fieldProps')"
      title="Field properties"
      value="fieldProps"
    >

      <hint-property v-model="model.layout.props"/>

      <text-property-wrapper
        :label="t('persistentHintIfExpression')"
        :model-value="model.layout.props['persistent-hint']"
        @update:model-value="updateExpressionPersistentHint"
      />
      <boolean-checkbox-property-wrapper
        v-model="model.layout.props['persistent-hint']"
        :label="t('persistentHint')"
      />
    </expansion-panel>

    <validations-panel
      v-model="model"
      :active="panels.includes('validations')"
      :show-counter="true"
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
import {useI18n} from "vue-i18n";

import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import HintProperty from "@/components/properties-drawer/atoms/HintProperty.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import ContentPropery from "@/components/properties-drawer/atoms/ContentPropery.vue";
import ConversionPanel from "@/components/properties-drawer/panels/ConversionPanel.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import ExpressionsPanel from "@/components/properties-drawer/panels/ExpressionsPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";

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

const {t} = useI18n({ useScope: 'global' })

function updateExpressionPersistentHint(val: string) {
  const regex = /^if\(([^,]+),([^,]+),([^)]+)\)$/;
  const matches = val.match(regex)
  if (matches) {
    model.value.layout.props['persistent-hint'] = val
  }
}

</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>
