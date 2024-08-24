<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>

  <read-only-property v-model="model.layout.props.readonly"/>
  <if-property v-model="model.layout.if"/>

  <v-list-item>
    <v-list-item-title>{{t('valueMapping')}}</v-list-item-title>
  </v-list-item>
  <false-value-mapping v-model="model.layout.props['false-value']"/>
  <true-value-mapping v-model="model.layout.props['true-value']"/>
</template>

<script lang="ts" setup>

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import {useI18n} from "vue-i18n";
import FalseValueMapping from "@/components/properties-drawer/atoms/FalseValueMapping.vue";
import TrueValueMapping from "@/components/properties-drawer/atoms/TrueValueMapping.vue";

const useBuilderStateStore = useBuilderState()
const {t} = useI18n()
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
    "valueMapping": "Value mapping"
  },
  "pl": {
    "valueMapping": "Mapowanie wartości"
  }
}
</i18n>
