<template>
  <key-property v-model="model.key"/>
  <col-property v-model="model.layout.cols"/>
  <duplicated-section-button-property v-model="model.layout.options.addBtnText"/>

  <select-general
    v-model="model.layout.options.addBtnMode"
    :items="[{value: 'add', title: t('addClearNode')}, {value:'copy', title: t('copyNode')}]"
    :label="t('addBtnMode')"
    :return-object="false"
    clearable
  />

  <duplicated-section-divider-property v-model="model.layout.options.showDivider"/>


  <checkbox-general
    v-model="model.editable"
    :label="t('editable')"
  />
  <checkbox-general
    v-model="model.showElements"
    :label="t('showElements')"
  />
  <switch-general
    v-model="model.layout.options.ordinalNumberInModel"
    :label="t('ordinalNumberInModel')"
  />
</template>

<script lang="ts" setup>

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import DuplicatedSectionButtonProperty from "@/components/properties-drawer/atoms/DuplicatedSectionButtonProperty.vue";
import DuplicatedSectionDividerProperty
  from "@/components/properties-drawer/atoms/DuplicatedSectionDividerProperty.vue";
import CheckboxGeneral from "@/components/properties-drawer/atoms/CheckboxGeneral.vue";
import {useI18n} from "vue-i18n";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";

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
    "editable": "Section is editable?",
    "showElements": "Show context elements?",
    "ordinalNumberInModel": "Add ordinal number in model",
    "addBtnMode": "Button mode",
    "addClearNode": "Add clear",
    "copyNode": "Copy above"
  },
  "pl": {
    "editable": "Edycja sekcji dozwolona",
    "showElements": "Pokazuj elementy kontekstowe?",
    "ordinalNumberInModel": "Dodaj liczbę porządkową do modelu",
    "addBtnMode": "Tryb przycisku",
    "addClearNode": "Dodawanie",
    "copyNode": "Kopiowanie powyższego"
  }
}
</i18n>
