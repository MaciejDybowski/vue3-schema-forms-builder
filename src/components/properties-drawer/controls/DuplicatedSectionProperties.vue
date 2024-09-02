<template>
  <key-property v-model="model.key"/>
  <col-property v-model="model.layout.cols"/>
  <duplicated-section-button-property v-model="model.layout.options.addBtnText"/>
  <duplicated-section-divider-property v-model="model.layout.options.showDivider"/>


  <checkbox-general
    :label="t('editable')"
    v-model="model.editable"
  />
  <checkbox-general
    :label="t('showElements')"
    v-model="model.showElements"
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
    "showElements": "Show context elements?"
  },
  "pl": {
    "editable": "Edycja sekcji dozwolona",
    "showElements": "Pokazuj elementy kontekstowe?"
  }
}
</i18n>
