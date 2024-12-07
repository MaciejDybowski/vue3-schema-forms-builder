<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <default-value-property/>
  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <read-only-property v-model="model.layout.props.readonly"/>
  <source-property v-model="source"/>
  <if-property v-model="model.layout.if"/>
  <validation-configuration/>
  <event-configuration/>
</template>

<script lang="ts" setup>

import {useBuilderState} from "@/pinia/stores/useBuilderState";
import {computed} from "vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import SourceProperty from "@/components/properties-drawer/atoms/SourceProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import EventConfiguration from "@/components/properties-drawer/atoms/EventConfiguration.vue";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";
import DefaultValueProperty from "@/components/properties-drawer/atoms/DefaultValueProperty.vue";

const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const source = computed({
  get() {
    if (!model.value.source) {
      return {}
    } else {
      return model.value.source
    }
  },
  set(val) {
    useBuilderStateStore.setKeyInConfiguredField("source", val)
  }
})

</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
