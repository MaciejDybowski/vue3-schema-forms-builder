<template>

  <text-property-wrapper
    v-model="suffixValue"
    :label="t('suffix')"
    :prefix="isReference? prefix: ''"

  />
  <boolean-checkbox-property-wrapper
    v-model="isReference"
    :label="t('useReference')"
    @change="referenceChangedTrigger"
  >
    <template #append>
      <v-tooltip
        location="left"
        width="300"
      >
        <template #activator="{ props }">
          <v-icon
            v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
        <span>{{ t('useReferenceInfo') }}</span>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>

</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useTranslateInput} from "@/composables/useTranslateInput";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";


const modelValue = defineModel<any>();
const {t} = useI18n({ useScope: 'global' });
const {
  prefix,
  isReference,
  referenceChanged,
  getValueForInput
} = useTranslateInput()

const suffixValue = getValueForInput('suffix', modelValue)

function referenceChangedTrigger() {
  referenceChanged(modelValue, "suffix", suffixValue.value)
}


</script>

<style lang="scss" scoped>

</style>
