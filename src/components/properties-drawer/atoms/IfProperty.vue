<template>
  <text-property-wrapper
    v-model="modelValue"
    :grow-enabled="false"
    :label="t('ifProperty')"
    :rows="3"
  >
    <template #append-inner>
      <div class="append-inner-column">
        <v-tooltip
          location="left"
          width="280"
        >
          <template #activator="{ props }">
            <v-icon v-bind="props">
              mdi-information-outline
            </v-icon>
          </template>
          <span>{{ t('ifPropertyInfo') }}</span>
        </v-tooltip>

        <v-icon
          class="clickable"
          @click="openAdvancedDialog(modelValue)"
        >
          mdi-cog
        </v-icon>
      </div>
    </template>
  </text-property-wrapper>

  <CodeEditorDialog
    v-model="modelInDialog"
    v-model:show="showAdvancedDialog"
    :codemirrorOptions="{}"
    @close="closeDialog"
    @save="() => modelValue = saveContent()"
  />
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import CodeEditorDialog from "@/components/properties-drawer/atoms/CodeEditorDialog.vue";
import {useCodeEditorDialog} from "@/composables/useCodeEditorDialog";

const {t} = useI18n({ useScope: 'global' });
const modelValue = defineModel();

const {
  modelInDialog,
  showAdvancedDialog,
  openAdvancedDialog,
  saveContent,
  closeDialog
} = useCodeEditorDialog()

</script>

<style lang="scss" scoped>
.append-inner-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.append-inner-column .clickable {
  cursor: pointer;
}
</style>
