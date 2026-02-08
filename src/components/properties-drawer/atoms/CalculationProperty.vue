<template>
  <div>
    <text-property-wrapper
      v-model="modelValue"
      :grow-enabled="false"
      :label="t('calculationProperty')"
      :rows="3"
      append-inner-icon="mdi-cog"
      @click:append-inner="openAdvancedDialog(modelValue)"
    />

    <CodeEditorDialog
      v-model="modelInDialog"
      v-model:show="showAdvancedDialog"
      :codemirrorOptions="{}"
      @close="closeDialog"
      @save="() => modelValue = saveContent()"
    />
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import CodeEditorDialog from "@/components/properties-drawer/atoms/CodeEditorDialog.vue";
import {useCodeEditorDialog} from "@/composables/useCodeEditorDialog";


const modelValue = defineModel()
const {
  modelInDialog,
  showAdvancedDialog,
  openAdvancedDialog,
  saveContent,
  closeDialog
} = useCodeEditorDialog()


const {t} = useI18n({ useScope: 'global' })
</script>

<style lang="scss" scoped>

</style>
