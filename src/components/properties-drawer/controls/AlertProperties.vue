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
        <boolean-checkbox-property-wrapper
          v-model="model.memorable"
          :label="t('memorableLabel')"
        />

        <content-propery v-model="model"/>
        <select-general
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
          v-model="model.layout.props.type"
          :items="[
             {value: 'success', title: t('success')},
             {value:'info', title: t('info')},
             {value:'warning', title: t('warning')},
             {value:'error', title: t('error')}]"
          :label="t('typeLabel')"
          :return-object="false"
          clearable
        />

        <select-general
          v-model="model.layout.props.density"
          :items="[
             {value: 'default', title: t('default')},
             {value:'comfortable', title: t('comfortable')},
             {value:'compact', title: t('compact')}]"
          :label="t('densityLabel')"
          :return-object="false"
          clearable
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
      :show-read-only-control="false"
    />
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import ContentPropery from "@/components/properties-drawer/atoms/ContentPropery.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";

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

const style = useStyle()

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
    "compact": "Compact",
    "memorableLabel": "Enable ability to mark as read"
  },
  "pl": {
    "variantLabel": "Wariant",
    "flat": "Płaski",
    "elevated": "Uniesiony",
    "tonal": "Tonowy",
    "outlined": "Obramowany",
    "text": "Tekstowy",
    "plain": "Prosty",
    "typeLabel": "Typ",
    "info": "Informacja",
    "success": "Sukces",
    "warning": "Ostrzeżenie",
    "error": "Błąd",
    "densityLabel": "Kompaktowość",
    "default": "Domyślny",
    "comfortable": "Wygodny",
    "compact": "Kompaktowy",
    "memorableLabel": "Włącz możliwość odznaczania jako przeczytane"
  }
}
</i18n>

