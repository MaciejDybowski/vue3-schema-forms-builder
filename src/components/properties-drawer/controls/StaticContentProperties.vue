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
      <content-propery v-model="model"/>
      <select-general
        v-if="model.layout.tag=='v-alert'"
        v-model="model.layout.props.variant"
        :items="[
       {value: 'flat', title: t('flat')},
       {value:'elevated', title: t('elevated')},
       {value:'plain', title: t('plain')},
       {value:'outlined', title: t('outlined')},
       {value:'text', title: t('text')},
       {value:'tonal', title: t('tonal')}]"
        :label="t('variantLabel')"
        :return-object="false"
        clearable
      />

      <select-general
        v-if="model.layout.tag=='v-alert'"
        v-model="model.layout.props.type"
        :items="[
       {value: 'success', title: t('success')},
       {value:'info', title: t('info')},
       {value:'warning', title: t('warning')},
       {value:'error', title: t('error')}]
    "
        :label="t('typeLabel')"
        :return-object="false"
        clearable
      />

      <select-general
        v-if="model.layout.tag=='v-alert'"
        v-model="model.layout.props.density"
        :items="[
       {value: 'default', title: t('default')},
       {value:'comfortable', title: t('comfortable')},
       {value:'compact', title: t('compact')}]
    "
        :label="t('densityLabel')"
        :return-object="false"
        clearable
      />
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('layout')"
      title="Layout"
      value="layout"
    >
      <col-property v-model="model.layout.cols"/>
      <offset-property v-model="model.layout.offset"/>
      <fill-row-property v-model="model.layout.fillRow"/>
    </expansion-panel>

    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
    </expansion-panel>
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import ContentPropery from "@/components/properties-drawer/atoms/ContentPropery.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import {useI18n} from "vue-i18n";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";

const panels = ref<string[]>(["general", "logic"])
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
    "variantLabel": "Variant",
    "flat": "Flat",
    "elevated": "Elevated",
    "tonal": "Tonal",
    "outlined": "Outlined",
    "text": "Text",
    "plain": "Plain",
    "typeLabel": "Type",
    "info": "Info",
    "success": "Success",
    "warning": "Warning",
    "error": "Error",
    "densityLabel": "Density",
    "default": "Default",
    "comfortable": "Comfortable",
    "compact": "Compact"
  },
  "pl": {
    "variantLabel": "Wariant",
    "flat": "Flat",
    "elevated": "Elevated",
    "tonal": "Tonal",
    "outlined": "Outlined",
    "text": "Text",
    "plain": "Plain",
    "typeLabel": "Type",
    "info": "Info",
    "success": "Success",
    "warning": "Warning",
    "error": "Error",
    "densityLabel": "Density",
    "default": "Default",
    "comfortable": "Comfortable",
    "compact": "Compact"
  }
}
</i18n>

