<template>
  <v-navigation-drawer
    v-model="drawers.propertiesDrawer.value"
    :style="!storybook ? `top: 65px; min-height: calc(100vh - 65px)` : ``"
    location="right"
    order="3"
    permament
    scrim="transparent"
    width="350"
  >

    <!--    <v-expansion-panels
          v-model="panels"
          elevation="0"
          multiple
        >
          <expansion-panel
            :active="panels.includes('general')"
            title="General"
            value="general"
          >

          </expansion-panel>
          <expansion-panel
            :active="panels.includes('layout')"
            title="Layout"
            value="layout"
          >
          </expansion-panel>
        </v-expansion-panels>-->

    <!--    style="top: 65px; min-height: calc(100vh - 65px)"-->
    <v-list v-if="useBuilderStateStore.getConfiguredField !== null">
      <text-field-properties v-if="model.layout.component == 'text-field'"/>
      <number-field-properties v-if="model.layout.component == 'number-field'"/>
      <static-content-properties v-if="model.layout.component == 'static-content'"/>
      <data-viewer-properties v-if="model.layout.component == 'data-viewer'"/>
      <select-radio-checkbox-properties v-if="optionsComponent"/>
      <duplicated-section-properties v-if="model.layout.component == 'duplicated-section'"/>
      <date-properties v-if="model.layout.component == 'date-picker' || model.layout.component == 'date-time-picker'"/>
      <dictionary-properties v-if="model.layout.component == 'dictionary' || model.layout.component =='combobox'"/>
      <text-area-properties v-if="model.layout.component == 'text-area'"/>
      <button-properties v-if="model.layout.component == 'button'"/>
      <user-input-properties v-if="model.layout.component == 'user-input'"/>
      <address-field-properties v-if="model.layout.component == 'address'"/>
      <phone-field-properties v-if="model.layout.component == 'phone'"/>
      <switch-properties v-if="model.layout.component == 'switch'"/>
      <divider-properties v-if="model.layout.component == 'divider'"/>
      <image-properties v-if="model.layout.component == 'image'"/>
      <fields-group v-if="model.layout.component == 'fields-group'"/>
      <table-view-properties v-if="model.layout.component == 'table'"/>
    </v-list>

  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {useDrawers} from "@/composables/useDrawers";
import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
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
import NumberFieldProperties from "@/components/properties-drawer/controls/NumberFieldProperties.vue";
import DividerProperties from "@/components/properties-drawer/controls/DividerProperties.vue";
import ImageProperties from "@/components/properties-drawer/controls/ImageProperties.vue";
import FieldsGroup from "@/components/properties-drawer/controls/FieldsGroup.vue";
import TableViewProperties from "@/components/properties-drawer/controls/TableViewProperties.vue";

const drawers = useDrawers();
const useBuilderStateStore = useBuilderState()
const panels = ref<string[]>([])

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

const host = window.location.hostname
const port = window.location.port
const storybook = computed(() => {
  return host === 'localhost' && port === "6006"
})
</script>

<style lang="scss" scoped>

.v-expansion-panel--active:not(:first-child), .v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0;
}

.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 48px;
}

.v-expansion-panel {
  border-radius: 0;
}


</style>
