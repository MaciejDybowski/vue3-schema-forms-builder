<template>
  <v-list-item>
    <div class="col-property">
      <p class="v-label">{{ t('label') }}</p>
      <v-btn-toggle
        v-model="modelValue"
        class="mt-1"
        density="compact"
        mandatory
        @update:model-value="calcCols"
      >
        <col-btn :value="0"></col-btn>
        <col-btn :value="1"></col-btn>
        <col-btn :value="2"></col-btn>
        <col-btn :value="3"></col-btn>
        <col-btn :value="4"></col-btn>
        <col-btn :value="5"></col-btn>
        <col-btn :value="6"></col-btn>
        <col-btn :value="7"></col-btn>
        <col-btn :value="8"></col-btn>
        <col-btn :value="9"></col-btn>
        <col-btn :value="10"></col-btn>
        <col-btn :value="11"></col-btn>
      </v-btn-toggle>
    </div>
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import ColBtn from "@/components/properties-drawer/atoms/ColBtn.vue";
import {useCanvas} from "@/composables/useCanvas";
import {useBuilderState} from "@/pinia/stores/useBuilderState";

const modelValue = defineModel<number>()
const {t} = useI18n()
const {canvasMode} = useCanvas()
const useBuilderStateStore = useBuilderState()

function calcCols(val: number) {
  const configuredField = useBuilderStateStore.getConfiguredField

  const mobileScreenCol = configuredField.layout.cols.sm
  if (mobileScreenCol + (val + 1) >= 12) {
    const newColsSize = 12 - val
    const newCols = {
      xs: newColsSize,
      sm: newColsSize,
      md: newColsSize,
      lg: newColsSize,
      xl: newColsSize,
      xxl: newColsSize
    }
    useBuilderStateStore.setKeyInConfiguredField("layout.cols", newCols)
  }
}

</script>

<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "en": {
    "label": "Offset"
  },
  "pl": {
    "label": "Przesunięcie pola"
  }
}
</i18n>
