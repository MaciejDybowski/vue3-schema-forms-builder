<template>
  <text-property-wrapper
    v-model="duplicatedSectionButton"
    :label="t('duplicatedSectionButtonText')"
    :prefix="isReference ? prefix : ''"
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
          <v-icon v-bind="props">
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
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const modelValue = defineModel<any>();
const {t} = useI18n({ useScope: 'global' });
const {prefix, isReference, referenceChanged, getValueForInput} = useTranslateInput();

const duplicatedSectionButton = getValueForInput("addBtnText", modelValue);

function referenceChangedTrigger() {
  referenceChanged(modelValue, "addBtnText", duplicatedSectionButton.value);
}
</script>

<style lang="scss" scoped></style>
