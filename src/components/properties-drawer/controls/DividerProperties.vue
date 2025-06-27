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
      <col-property v-model="model.layout.cols"/>

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
    </expansion-panel>
    <expansion-panel
      :active="panels.includes('logic')"
      title="Logic"
      value="logic"
    >
      <if-property v-model="model.layout.if"/>
    </expansion-panel>
  </v-expansion-panels>


</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/cols/ColProperty.vue";

import {useI18n} from "vue-i18n";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";

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
