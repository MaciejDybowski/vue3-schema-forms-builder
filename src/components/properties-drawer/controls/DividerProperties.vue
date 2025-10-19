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
        <number-property-wrapper
          v-model="model.thickness"
          :label="t('thickness')"
        />
        <text-property-wrapper
          v-model="model.color"
          :label="t('color')"
        />
        <text-property-wrapper
          v-model="model.opacity"
          :label="t('opacity')"
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
      :show-read-only-expression-control="false"
    />


  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";

import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";
import GeneralPanel from "@/components/properties-drawer/panels/GeneralPanel.vue";
import LogicPanel from "@/components/properties-drawer/panels/LogicPanel.vue";
import LayoutPanel from "@/components/properties-drawer/panels/LayoutPanel.vue";

const panels = ref<string[]>(["general"])
const {t} = useI18n()
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
<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "thickness": "Thickness",
    "color": "Color",
    "opacity": "Opacity"
  },
  "pl": {
    "thickness": "Szerokość",
    "color": "Kolor",
    "opacity": "Przeźroczystość"
  }
}
</i18n>
