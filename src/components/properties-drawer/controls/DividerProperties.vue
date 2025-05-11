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

      <number-general
        v-model="model.thickness"
        :label="t('thickness')"
      />
      <textfield-general
        v-model="model.color"
        :label="t('color')"
      />
      <textfield-general
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
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import NumberGeneral from "@/components/properties-drawer/atoms/NumberGeneral.vue";
import {useI18n} from "vue-i18n";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";

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
