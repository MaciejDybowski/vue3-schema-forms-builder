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
          { value: 'date-picker', title: t('conversion.datePicker') },
          { value: 'date-time-picker', title: t('conversion.dateTimePicker') }
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
        <text-property-wrapper
          v-model="model.formatInModel"
          :label="t('formatInModel')"
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
import {useI18n} from "vue-i18n";

import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";

import ConversionPanel from "@/components/properties-drawer/panels/ConversionPanel.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";

const {t} = useI18n();
const panels = ref<string[]>(["general"]);
const useBuilderStateStore = useBuilderState();

const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField;
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val);
  }
});
</script>

<style lang="scss" scoped></style>

<i18n lang="json">
{
  "en": {
    "conversion": {
      "label": "Form field",
      "datePicker": "Date picker",
      "dateTimePicker": "Date & time picker"
    },
    "formatInModel": "Format in model"
  },
  "pl": {
    "conversion": {
      "label": "Pole formularza",
      "datePicker": "Pole daty",
      "dateTimePicker": "Pole daty i godziny"
    },
    "formatInModel": "Format w modelu"
  }
}
</i18n>
