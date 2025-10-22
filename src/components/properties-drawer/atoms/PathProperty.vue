<template>
  <text-property-wrapper
    :model-value="useBuilderStateStore.getConfiguredFieldPath"
    :label="t('pathProperty')"
    readonly
  >
    <template #append-inner>
      <v-btn
        icon
        size="small"
        variant="text"
        @click="copyPath"
      >
        <v-icon size="18">mdi-content-copy</v-icon>
      </v-btn>
    </template>
  </text-property-wrapper>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useBuilderState } from "@/pinia/useBuilderState";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {toast} from "vue3-toastify";

const useBuilderStateStore = useBuilderState();
const { t } = useI18n();

async function copyPath() {
  const path = useBuilderStateStore.getConfiguredFieldPath;
  if (!path) return;

  try {
    await navigator.clipboard.writeText(path);
    toast?.success(t("copied"));
  } catch (err) {
    toast?.error(t("copyFailed"));
    console.error("Clipboard copy failed:", err);
  }
}
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "pathProperty": "Field path",
    "copied": "Copied to clipboard!",
    "copyFailed": "Failed to copy."
  },
  "pl": {
    "pathProperty": "Ścieżka do pola",
    "copied": "Skopiowano do schowka!",
    "copyFailed": "Nie udało się skopiować."
  }
}
</i18n>
