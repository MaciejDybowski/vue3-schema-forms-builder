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
        <text-property-wrapper
          v-model="model.fileLabel"
          :label="t('fileLabel')"
        />
        <text-property-wrapper
          v-model="model.fileAvailableExtensions"
          :hint="t('fileAvailableExtensionsHint')"
          :label="t('fileAvailableExtensions')"
          :persistent-hint="true"
        />
        <number-property-wrapper
          v-model="model.fileMaxSize"
          :label="t('fileMaxSize')"
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

    <validation-configuration :active="panels.includes('validations')"/>
  </v-expansion-panels>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import {useI18n} from "vue-i18n";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";


const panels = ref<string[]>(["general"])
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
</script>
<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "pl": {
    "fileLabel": "Etykieta pliku",
    "fileAvailableExtensions": "Dostępne rozszerzenie",
    "fileAvailableExtensionsHint": "Rozszerzenia rodzielone przecinkiem",
    "fileMaxSize": "Max. rozmiar w MB"
  },
  "en": {
    "fileLabel": "File label",
    "fileAvailableExtensions": "Available extension",
    "fileAvailableExtensionsHint": "Extensions separated by comma",
    "fileMaxSize": "Max. size in MB"
  }
}
</i18n>
