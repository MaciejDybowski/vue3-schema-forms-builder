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
import { useBuilderLocale } from "@/composables/useBuilderLocale";
import { useBuilderState } from "@/pinia/useBuilderState";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import {toast} from "vue3-toastify";

const useBuilderStateStore = useBuilderState();
const {t} = useBuilderLocale();

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
