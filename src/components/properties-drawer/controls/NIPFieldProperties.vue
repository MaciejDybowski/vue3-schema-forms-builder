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
      :show-counter="false"
    >
      <template #beforeRequired>

        <boolean-checkbox-property-wrapper
          v-model="isChecksumEnabled"
          :label="t('isChecksumEnabled')"
        />

        <select-general
          v-if="isChecksumEnabled"
          v-model="model.checkSumValidation"
          :clearable="false"
          :items="[
          {value: 'warning', title: t('validation.warning')},
          {value: 'error', title: t('validation.error')},
       ]"
          :label="t('validation.type')"
          :return-object="false"
        />
      </template>
    </validations-panel>

    <event-configruation-panel
      :active="panels.includes('events')"
    />
  </v-expansion-panels>

</template>

<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import {useI18n} from "vue-i18n";

import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";

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

const isChecksumEnabled = ref(false)


const {t} = useI18n({ useScope: 'global' })

onMounted(() => {
  if (model.value.checkSumValidation != undefined) {
    isChecksumEnabled.value = true
  }

})

</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>
