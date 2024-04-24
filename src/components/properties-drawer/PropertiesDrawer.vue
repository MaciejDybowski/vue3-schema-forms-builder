<template>
  <v-navigation-drawer
    v-model="drawers.propertiesDrawer.value"
    width="300"
    permament
    order="3"
    location="right"
    scrim="transparent"
    style="top: 65px; height: 100%"

  >
    <v-list v-if="useBuilderStateStore.getConfiguredField !== null">
      <v-list-item>
        <v-text-field
          class="pt-2"
          label="Klucz w modelu"
          v-model="model.key"
          v-bind="fieldProps"
        />
      </v-list-item>

      <v-list-item>
        <v-text-field
          class="pt-2"
          label="Etykieta"
          v-model="model.label"
          v-bind="fieldProps"
        />
      </v-list-item>

      <v-list-item>
        <v-text-field
          class="pt-2"
          label="Tekst"
          v-model="model.content"
          v-bind="fieldProps"
        />
      </v-list-item>


      <v-list-item>
        <col-property v-model="model.layout.cols"/>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {useDrawers} from "../../composables/useDrawers";
import {computed} from "vue";
import ColProperty from "../../components/properties-drawer/atoms/ColProperty.vue";
import {useBuilderState} from "../../pinia/stores/useBuilderState";
import {VTextField} from "vuetify/components";

const fieldProps: any/*Partial<VTextField>*/ = {
  density: "comfortable",
  variant: "outlined",
  hideDetails: "auto",
}

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
</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
