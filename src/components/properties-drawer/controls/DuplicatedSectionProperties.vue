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
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('fieldProps')"
      title="Properties"
      value="fieldProps"
    >
      <duplicated-section-button-property v-model="model.layout.options"/>

      <select-general
        v-model="model.layout.options.addBtnMode"
        :items="[{value: 'add', title: t('addClearNode')}, {value:'copy', title: t('copyNode')}, {value:'action', title: t('actionCall')}]"
        :label="t('addBtnMode')"
        :return-object="false"
        clearable
      />

      <text-property-wrapper
        v-if="model.layout.options.addBtnMode === 'action'"
        v-model="actionCode"
        label="Kod akcji"
        @update:model-value="updateActionCode"
      />


      <boolean-switch-property-wrapper
        v-model="model.layout.options.showDivider"
        :label="t('duplicatedSectionShowDivider')"
      />


      <boolean-checkbox-property-wrapper
        v-model="model.editable"
        :label="t('editable')"
      />
      <boolean-checkbox-property-wrapper
        v-model="model.showElements"
        :label="t('showElements')"
      />
      <boolean-switch-property-wrapper
        v-model="model.layout.options.ordinalNumberInModel"
        :label="t('ordinalNumberInModel')"
      />
      <boolean-switch-property-wrapper
        v-model="model.layout.options.showFirstInitRow"
        :label="t('showFirstInitRow')"
      />
    </expansion-panel>
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";
import DuplicatedSectionButtonProperty from "@/components/properties-drawer/atoms/DuplicatedSectionButtonProperty.vue";
import {useI18n} from "vue-i18n";

import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";

import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const panels = ref<string[]>(["general", "fieldProps"])
const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const actionCode = ref(null)

function updateActionCode(val: String) {
  if (model.value.layout.options.action) {
    model.value.layout.options.action.code = val
  } else {
    model.value.layout.options.action = {}
  }
}

onMounted(() => {
  if (model.value.layout.options.addBtnMode === 'action') {
    actionCode.value = model.value.layout.options.action.code
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
    "copyNode": "Copy above",
    "actionCall": "Call action",
    "showFirstInitRow": "Show empty first line",
    "duplicatedSectionShowDivider": "Show divider between section"
  },
  "pl": {
    "editable": "Edycja sekcji dozwolona",
    "showElements": "Pokazuj elementy kontekstowe?",
    "ordinalNumberInModel": "Dodaj liczbę porządkową do modelu",
    "addBtnMode": "Tryb przycisku",
    "addClearNode": "Dodawanie",
    "copyNode": "Kopiowanie powyższego",
    "actionCall": "Wywołaj akcję",
    "showFirstInitRow": "Pokazuj pusty pierwszy wiersz",
    "duplicatedSectionShowDivider": "Pokazuj rozdzielacz pomiędzy sekcjami"
  }
}
</i18n>
