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
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <offset-property v-model="model.layout.offset"/>
      <fill-row-property v-model="model.layout.fillRow"/>
      <text-property-wrapper v-model="model.layout.cellClass" label="Cell CSS classes"/>
    </expansion-panel>

    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic">
      <read-only-property v-model="model.layout.props.readonly"/>

      <if-property v-model="model.layout.if"/>
      <boolean-switch-property-wrapper
        v-model="model.layout.hide"
        :label="model.layout.hide ? t('hide') : t('visible')"
      />
    </expansion-panel>

    <expansion-panel
      :active="panels.includes('fieldProps')"
      title="Properties"
      value="fieldProps"
    >
      <multiple-property v-model="model.layout.props.multiple"/>



      <number-property-wrapper
        v-if="model.layout.props.multiple == true"
        v-model="model.layout.props.maxSelection"
        :label="t('maxSelection')"
      />
    </expansion-panel>

    <expansion-panel
      :active="panels.includes('source')"
      title="Source"
      value="source"
    >
      <user-url-source v-model="source"/>
    </expansion-panel>

    <validation-configuration :active="panels.includes('validations')"/>
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import {useI18n} from "vue-i18n";
import OffsetProperty from "@/components/properties-drawer/atoms/offset/OffsetProperty.vue";
import MultipleProperty from "@/components/properties-drawer/atoms/MultipleProperty.vue";
import UserUrlSource from "@/components/properties-drawer/atoms/UserUrlSource.vue";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const panels = ref<string[]>(["general", "logic", "source", "validations"]);
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


const filter = computed({
  get() {
    if (!("filter" in model.value)) {
      filter.value = {group: null}
    }
    return model.value.filter
  },
  set(val) {
    useBuilderStateStore.setKeyInConfiguredField("filter", val)
  }
})

const source = computed({
  get() {
    if (!model.value.source) {
      source.value = {}
    }
    return model.value.source
  },
  set(val) {
    useBuilderStateStore.setKeyInConfiguredField("source", val)
  }
})

</script>


<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "customsTitle": "Specials",
    "customEndpoint": "Not default endpoint",
    "maxSelection": "Max selections"
  },
  "pl": {
    "customsTitle": "Filtry",
    "customEndpoint": "Endpoint danych",
    "maxSelection": "Dozwolonych wartości"
  }
}
</i18n>
