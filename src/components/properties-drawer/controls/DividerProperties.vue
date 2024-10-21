<template>
  <key-property v-model="model.key"/>
  <col-property v-model="model.layout.cols"/>

  <number-general
    :label="t('thickness')"
    v-model="model.thickness"
  />
  <textfield-general
    :label="t('color')"
    v-model="model.color"
  />
  <textfield-general
    :label="t('opacity')"
    v-model="model.opacity"
  />

</template>

<script lang="ts" setup>

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import NumberGeneral from "@/components/properties-drawer/atoms/NumberGeneral.vue";
import {useI18n} from "vue-i18n";
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
