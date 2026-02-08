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
        <content-propery v-model="model"/>

        <select-general
          v-model="model.layout.tag"
          :items="[
            {value: 'h1', title: t('header1')},
            {value: 'h2', title: t('header2')},
            {value: 'h3', title: t('header3')},
            {value: 'p', title: t('paragraph')},
            {value: 'span', title: t('span')}
          ]"
          :label="t('componentLabel')"
          :return-object="false"
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
import {useBuilderLocale} from "@/composables/useBuilderLocale";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";

const panels = ref<string[]>(["general"]);
const {t} = useBuilderLocale();
const useBuilderStateStore = useBuilderState();

const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField;
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val);
  }
});
</script>

<style lang="scss" scoped>
</style>
