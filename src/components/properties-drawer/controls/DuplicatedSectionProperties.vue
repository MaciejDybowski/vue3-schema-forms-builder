<template>
  <key-property v-model="model.key"/>
  <col-property v-model="model.layout.cols"/>
  <duplicated-section-button-property v-model="model.layout.options.addBtnText"/>

  <select-general
    v-model="model.layout.options.addBtnMode"
    :items="[{value: 'add', title: t('addClearNode')}, {value:'copy', title: t('copyNode')}, {value:'action', title: t('actionCall')}]"
    :label="t('addBtnMode')"
    :return-object="false"
    clearable
  />

  <textfield-general
    v-if="model.layout.options.addBtnMode === 'action'"
    v-model="actionCode"
    label="Kod akcji"
    @update:model-value="updateActionCode"
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

import {computed, onMounted, ref} from "vue";
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
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";

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
  if(model.value.layout.options.addBtnMode === 'action') {
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
    "actionCall": "Call action"
  },
  "pl": {
    "editable": "Edycja sekcji dozwolona",
    "showElements": "Pokazuj elementy kontekstowe?",
    "ordinalNumberInModel": "Dodaj liczbę porządkową do modelu",
    "addBtnMode": "Tryb przycisku",
    "addClearNode": "Dodawanie",
    "copyNode": "Kopiowanie powyższego",
    "actionCall": "Wywołaj akcję"
  }
}
</i18n>
