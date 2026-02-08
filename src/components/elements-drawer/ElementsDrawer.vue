<template>
  <v-navigation-drawer
    v-model="drawers.elementsDrawer.value"
    :style="!storybook ? `top: 65px; min-height: calc(100vh - 65px)` : ``"
    class="element-drawer pt-2"
    order="3"
    permament
    scrim="transparent"
    width="300"
  >
    <tcn-au-query
      class="px-1"
      v-model="query"/>
    <v-tabs
      v-model="tab"
      :items="tabs"
      align-tabs="center"
      class="mx-2"
      slider-color="primary"
    >

      <v-tab
        v-for="tabItem in tabs"
        :text="tabItem.text"
        :value="tabItem.value"
        class="text-none"
        width="50%"
      ></v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="fields">
          <form-elements :query="query"/>
        </v-tabs-window-item>
        <v-tabs-window-item value="page">
          <page-elements :query="query"/>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>


  </v-navigation-drawer>
</template>

<script lang="ts" setup>

import {useDrawers} from "@/composables/useDrawers";

import {computed, ref} from "vue";
import FormElements from "@/components/elements-drawer/FormElements.vue";
import PageElements from "@/components/elements-drawer/PageElements.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";

const {t} = useBuilderLocale()
const drawers = useDrawers();
const tab = ref(null)
const tabs = computed(() => [
  {
    text: t('fields'),
    value: 'fields',
  },
  {
    text: t('page'),
    value: 'page',
  },
])

const query = ref("")
const host = window.location.hostname
const port = window.location.port
const storybook = computed(() => {
  return host === 'localhost' && port === "6006"
})

</script>

<style lang="scss" scoped></style>
