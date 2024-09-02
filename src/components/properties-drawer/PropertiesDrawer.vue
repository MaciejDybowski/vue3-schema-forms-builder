<template>
  <v-navigation-drawer
    v-model="drawers.propertiesDrawer.value"
    location="right"
    order="3"
    permament
    scrim="transparent"
    width="350"
    style="top: 65px; min-height: calc(100vh - 65px)"
  >
    <!--    style="top: 65px; min-height: calc(100vh - 65px)"-->
    <v-list v-if="useBuilderStateStore.getConfiguredField !== null">
      <text-field-properties v-if="model.layout.component == 'text-field'"/>
      <static-content-properties v-if="model.layout.component == 'static-content'"/>
      <data-viewer-properties v-if="model.layout.component == 'data-viewer'"/>
      <select-radio-checkbox-properties v-if="optionsComponent"/>
      <duplicated-section-properties v-if="model.layout.component == 'duplicated-section'"/>
      <date-properties v-if="model.layout.component == 'date-picker' || model.layout.component == 'date-time-picker'"/>
      <dictionary-properties v-if="model.layout.component == 'dictionary'"/>
      <text-area-properties v-if="model.layout.component == 'text-area'"/>
      <button-properties v-if="model.layout.component == 'button'"/>
      <user-input-properties v-if="model.layout.component == 'user-input'"/>
      <address-field-properties v-if="model.layout.component == 'address'"/>
      <phone-field-properties v-if="model.layout.component == 'phone'"/>
      <switch-properties v-if="model.layout.component == 'switch'"/>
    </v-list>

  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {useDrawers} from "../../composables/useDrawers";
import {computed} from "vue";
import {useBuilderState} from "../../pinia/stores/useBuilderState";
import TextFieldProperties from "@/components/properties-drawer/controls/TextFieldProperties.vue";
import StaticContentProperties from "@/components/properties-drawer/controls/StaticContentProperties.vue";
import DataViewerProperties from "@/components/properties-drawer/controls/DataViewerProperties.vue";
import DateProperties from "@/components/properties-drawer/controls/DateProperties.vue";
import DictionaryProperties from "@/components/properties-drawer/controls/DictionaryProperties.vue";
import TextAreaProperties from "@/components/properties-drawer/controls/TextAreaProperties.vue";
import SelectRadioCheckboxProperties from "@/components/properties-drawer/controls/SelectRadioCheckboxProperties.vue";
import ButtonProperties from "@/components/properties-drawer/controls/ButtonProperties.vue";
import UserInputProperties from "@/components/properties-drawer/controls/UserInputProperties.vue";
import AddressFieldProperties from "@/components/properties-drawer/controls/AddressFieldProperties.vue";
import PhoneFieldProperties from "@/components/properties-drawer/controls/PhoneFieldProperties.vue";
import SwitchProperties from "@/components/properties-drawer/controls/SwitchProperties.vue";
import DuplicatedSectionProperties from "@/components/properties-drawer/controls/DuplicatedSectionProperties.vue";


const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()

const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const optionsComponent = computed(() => {
  return model.value.layout.component == 'select' ||
    model.value.layout.component == 'radio-button' ||
    model.value.layout.component == 'checkbox'
})
</script>

<style lang="scss" scoped></style>
