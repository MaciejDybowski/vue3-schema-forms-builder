<template>
  <key-property v-model="model.key"/>
  <label-property v-model="model.label"/>
  <v-list-item>
    <v-switch
      class="mx-2"
      v-model="model.type"
      :label="model.type=='int' ? t('int') : t('float')"
      false-value="float"
      true-value="int"
      hide-details="auto"
    />
  </v-list-item>
  <textfield-general
    v-if="model.type=='float'"
    :label="t('precision')"
    v-model="model.precision"
    type="number"
  />

  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <required-property v-model="model.required"/>
  <read-only-property v-model="model.layout.props.readonly"/>
  <if-property v-model="model.layout.if"/>


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
import {useI18n} from "vue-i18n";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";

const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const {t} = useI18n()

</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "int": "Integer",
    "float": "Float",
    "precision": "Precision"
  },
  "pl": {
    "int": "Całkowita",
    "float": "Zmiennoprzecinkowa",
    "precision": "Precyzja zaokrągleń"
  }
}
</i18n>
