<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <read-only-property v-model="model.layout.props.readonly"/>
  <multiple-property v-model="model.layout.props.multiple"/>
  <number-general
    v-if="model.layout.props.multiple == true"
    :label="t('maxSelection')"
    v-model="model.layout.props.maxSelection"
  />

  <if-property v-model="model.layout.if"/>


  <v-list-item density="compact">
    <v-divider/>
  </v-list-item>
  <v-list-item density="compact">
    <span class="text-subtitle-1">{{ t("customsTitle") }}</span>
  </v-list-item>
  <group-filter-property v-model="filter.group"/>
  <user-url-source v-model="source"/>
  <validation-configuration/>

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
import GroupFilterProperty from "@/components/properties-drawer/atoms/GroupFilterProperty.vue";
import {useI18n} from "vue-i18n";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";
import MultipleProperty from "@/components/properties-drawer/atoms/MultipleProperty.vue";
import UserUrlSource from "@/components/properties-drawer/atoms/UserUrlSource.vue";
import NumberGeneral from "@/components/properties-drawer/atoms/NumberGeneral.vue";
import ValidationConfiguration from "@/components/properties-drawer/atoms/ValidationConfiguration.vue";

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


const filter = computed({
  get() {
    if (!("filter" in model.value)) {
      filter.value = {group: null}
    }
    return model.value.filter
  },
  set(val) {
    useBuilderStateStore.setKeyInConfiguredField("filter", val)
  }
})

const source = computed({
  get() {
    if (!model.value.source) {
      source.value = {}
    }
    return model.value.source
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
  "en": {
    "customsTitle": "Specials",
    "customEndpoint": "Not default endpoint",
    "maxSelection": "Max selections"
  },
  "pl": {
    "customsTitle": "Filtry",
    "customEndpoint": "Endpoint danych",
    "maxSelection": "Dozwolonych wartości"
  }
}
</i18n>
