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
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <text-property-wrapper v-model="model.layout.cellClass" label="Cell CSS classes"/>
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
      <boolean-switch-property-wrapper
        v-model="model.layout.hide"
        :label="model.layout.hide ? t('hide') : t('visible')"
      />
      <text-property-wrapper v-model="model.layout.hide" label="Hide boolean/expression"/>
    </expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import {computed, ref} from "vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import {useI18n} from "vue-i18n";

;

const panels = ref<string[]>(["general", "layout"])
const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const {t} = useI18n()
</script>


<style lang="scss" scoped>

</style>


<i18n lang="json">
{
  "en": {
    "hide": "Hide",
    "visible": "Visible"
  },
  "pl": {
    "hide": "Ukryte",
    "visible": "Widoczne"
  }
}
</i18n>
