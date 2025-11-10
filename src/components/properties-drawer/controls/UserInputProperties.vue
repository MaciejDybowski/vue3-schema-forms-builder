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
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import {useI18n} from "vue-i18n";
import MultipleProperty from "@/components/properties-drawer/atoms/MultipleProperty.vue";
import UserUrlSource from "@/components/properties-drawer/atoms/UserUrlSource.vue";
import ValidationsPanel from "@/components/properties-drawer/panels/ValidationsPanel.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import EventConfigruationPanel from "@/components/properties-drawer/panels/EventConfigruationPanel.vue";

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
