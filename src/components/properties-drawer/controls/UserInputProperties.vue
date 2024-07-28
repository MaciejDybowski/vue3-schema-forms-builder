<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <required-property v-model="model.required"/>
  <read-only-property v-model="model.layout.props.readOnly"/>
  <if-property v-model="model.layout.if"/>


  <v-list-item density="compact">
    <v-divider/>
  </v-list-item>
  <v-list-item density="compact">
    <span class="text-subtitle-1">{{ t("filterTitle") }}</span>
  </v-list-item>
  <group-filter-property v-model="filter.group"/>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import LabelProperty from "@/components/properties-drawer/atoms/LabelProperty.vue";
import KeyProperty from "@/components/properties-drawer/atoms/KeyProperty.vue";
import ColProperty from "@/components/properties-drawer/atoms/ColProperty.vue";
import FillRowProperty from "@/components/properties-drawer/atoms/FillRowProperty.vue";
import RequiredProperty from "@/components/properties-drawer/atoms/RequiredProperty.vue";
import ReadOnlyProperty from "@/components/properties-drawer/atoms/ReadOnlyProperty.vue";
import IfProperty from "@/components/properties-drawer/atoms/IfProperty.vue";
import GroupFilterProperty from "@/components/properties-drawer/atoms/GroupFilterProperty.vue";
import {useI18n} from "vue-i18n";
import OffsetProperty from "@/components/properties-drawer/atoms/OffsetProperty.vue";

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
    if (!model.value.filter) {
      return {
        group: null
      }
    } else {
      return model.value.filter
    }
  },
  set(val) {
    console.debug(val)
    useBuilderStateStore.setKeyInConfiguredField("filter", val)
  }
})

</script>


<style scoped lang="scss">

</style>

<i18n lang="json">
{
  "en": {
    "filterTitle": "Filters"
  },
  "pl": {
    "filterTitle": "Filtry"
  }
}
</i18n>
