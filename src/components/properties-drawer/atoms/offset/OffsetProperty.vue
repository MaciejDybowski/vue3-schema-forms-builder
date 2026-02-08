<template>
  <v-list-item class="pb-0">
    <offset-btn-toggle
      v-model:breakpoint-larger="modelValue.xxl"
      v-model:breakpoint-smaller="modelValue.xl"
      v-model:breakpoint-smallest="modelValue.lg"
      :label="t('offset.desktop')"
    />
    <offset-btn-toggle
      v-model:breakpoint-larger="modelValue.md"
      v-model:breakpoint-smaller="modelValue.sm"
      v-model:breakpoint-smallest="modelValue.sm"
      :label="t('offset.tablet')"
    />
    <offset-btn-toggle
      v-model:breakpoint-larger="modelValue.xs"
      v-model:breakpoint-smaller="modelValue.xs"
      v-model:breakpoint-smallest="modelValue.xs"
      :label="t('offset.mobile')"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import OffsetBtnToggle from "@/components/properties-drawer/atoms/offset/OffsetBtnToggle.vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import {watch} from "vue";


const modelValue = defineModel<{
  xxl: number,
  xl: number,
  lg: number,
  md: number,
  sm: number,
  xs: number
}>({
  default: {}
})

watch(() => modelValue.value, () => {
  calcCols()
}, {deep: true})

const useBuilderStateStore = useBuilderState()

function calcCols() {
  const configuredField = useBuilderStateStore.getConfiguredField;
  const cols = configuredField.layout.cols;

  for (let [key, value] of Object.entries(cols)) {
    if (value + modelValue.value[key] > 12) {
      cols[key] = 12 - modelValue.value[key]; // Reassign directly to the object
    }
  }


}

const {t} = useI18n({ useScope: 'global' })

</script>

<style lang="scss" scoped>

</style>
