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
          v-model="model.mode"
          :items="[{ value: 'visibility', title: t('visibility') }]"
          :label="t('switchMode')"
          :return-object="false"
        />

        <v-alert
          v-if="model.mode === 'visibility'"
          :text="t('visibilityInfo')"
          class="forms-builder-smaller-alert mx-4"
          density="compact"
          elevation="0"
          type="info"
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

    <swtich-props-panel
      v-model="model"
      :active="panels.includes('fieldProps')"
    />
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import {useI18n} from "vue-i18n";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import SwtichPropsPanel from "@/components/properties-drawer/panels/SwtichPropsPanel.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";

const useBuilderStateStore = useBuilderState();
const {t} = useI18n();
const panels = ref<string[]>(["general", "logic", "fieldProps"]);
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
    "switchMode": "Switch mode",
    "visibility": "Visibility",
    "visibilityInfo": "Value of switch is internal"
  },
  "pl": {
    "switchMode": "Tryb przełącznika",
    "visibility": "Widoczność",
    "visibilityInfo": "Wartość przełącznika jest wewnętrzna (nie zapisuje się w modelu formularza)"
  }
}
</i18n>
