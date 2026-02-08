<template>
  <expansion-panel
    :active="active"
    :title="t('conversion.title')"
    value="conversion"
  >
    <v-alert
      class="forms-builder-smaller-alert mx-4"
      density="compact"
      elevation="0"
      type="info"
    >
      <template #prepend>
        <v-icon size="20">mdi-information-outline</v-icon>
      </template>
      {{ t("conversion.info") }}
    </v-alert>

    <slot name="default"/>
  </expansion-panel>
</template>

<script lang="ts" setup>
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import {useBuilderLocale} from "@/composables/useBuilderLocale";

const {t} = useBuilderLocale();
const {active} = defineProps<{
  active: boolean;
}>()
</script>

<style lang="scss">
.forms-builder-smaller-alert {
  font-size: 0.8rem;
  line-height: 1.3;
  padding: 6px 10px;
  text-align: justify;

  :deep(.v-alert__prepend) {
    margin-right: 4px;
  }
}
</style>
