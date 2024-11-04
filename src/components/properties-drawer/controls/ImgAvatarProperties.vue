<template>
  <key-property v-model="model.key"/>

  <col-property v-model="model.layout.cols"/>
  <offset-property v-model="model.layout.offset"/>
  <fill-row-property v-model="model.layout.fillRow"/>
  <if-property v-model="model.layout.if"/>

  <textfield-general
    :label="t('thumbnailUrl')"
    v-model="model.source.thumbnail"
  />

  <textfield-general
    :label="t('previewUrl')"
    v-model="model.source.preview"
  />

  <number-general
    :label="t('rounded')"
    v-model="model.layout.props.rounded"
  />

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
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import NumberGeneral from "@/components/properties-drawer/atoms/NumberGeneral.vue";

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
    "thumbnailUrl": "Thumbnail URL",
    "previewUrl": "Preview URL",
    "rounded": "Rounded"
  },
  "pl": {
    "thumbnailUrl": "URL miniaturki",
    "previewUrl": "URL zdjęcia",
    "rounded": "Zaokrąglenie"
  }
}
</i18n>
