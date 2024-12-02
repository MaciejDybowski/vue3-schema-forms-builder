<template>
  <!--    style="top: 65px; height: 100%"-->
  <v-navigation-drawer
    v-model="drawers.elementsDrawer.value"
    class="element-drawer"
    order="3"
    permament
    scrim="transparent"
    style="top: 65px; min-height: calc(100vh - 65px)"
    width="300"
  >
    <!--    style="top: 65px; min-height: calc(100vh - 65px)"-->
    <v-text-field
      class="mx-2 pt-2"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
    />
    <v-tabs
      v-model="tab"
      :items="tabs"
      align-tabs="center"
      class="mx-2"
      slider-color="primary"
    >

      <v-tab
        v-for="tab in tabs"
        :text="tab.text"
        :value="tab.value"
        class="text-none"
        width="50%"
      ></v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item class="pa-4" value="fields">
          <form-elements/>
        </v-tabs-window-item>
        <v-tabs-window-item value="page">
          <page-elements/>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>


  </v-navigation-drawer>
</template>

<script lang="ts" setup>

import {useDrawers} from "@/composables/useDrawers";

import {ref} from "vue";
import FormElements from "@/components/elements-drawer/FormElements.vue";
import PageElements from "@/components/elements-drawer/PageElements.vue";

const drawers = useDrawers();


const tab = ref(null)
const tabs = ref([
  {
    text: 'Fields',
    value: 'fields',
  },
  {
    text: 'Page',
    value: 'page',
  },
])


</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
