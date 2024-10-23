<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <required-property v-model="model.required"/>
  <read-only-property v-model="model.layout.props.readonly"/>
  <if-property v-model="model.layout.if"/>

  <v-list-item>
    <v-list-item-title>{{t('validations')}}</v-list-item-title>
    <v-list-item-subtitle>
      <v-divider/>
    </v-list-item-subtitle>
  </v-list-item>
  <number-general
    :label="t('counter')"
    v-model="model.layout.props['counter']"
  />
</template>

<script lang="ts" setup>

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import RequiredProperty from "@/components/properties-drawer/atoms/RequiredProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
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
    "validations": "Validations",
    "counter": "Counter of letters"
  },
  "pl": {
    "validations": "Walidacje",
    "counter": "Licznik liter"
  }
}
</i18n>

