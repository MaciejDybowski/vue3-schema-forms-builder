<template>
  <div>
    <text-property-wrapper
      v-model="model"
      :grow-enabled="false"
      :label="t('expression')"
      :rows="5"
      append-inner-icon="mdi-cog"
      @click:append-inner="openAdvancedDialog(model)"
    />

    <CodeEditorDialog
      v-model="modelInDialog"
      v-model:show="showAdvancedDialog"
      :codemirrorOptions="{}"
      @close="closeDialog"
      @save="() => model = saveContent()"
    />
  </div>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import CodeEditorDialog from "@/components/properties-drawer/atoms/CodeEditorDialog.vue";
import {useCodeEditorDialog} from "@/composables/useCodeEditorDialog";

const {t} = useI18n({ useScope: 'global' });


const model = defineModel<any>();
const {
  modelInDialog,
  showAdvancedDialog,
  openAdvancedDialog,
  saveContent,
  closeDialog
} = useCodeEditorDialog()


</script>

<style lang="scss" scoped>
.resizeable {
  resize: both;
  min-height: 200px;
  min-width: 600px;
  overflow: hidden;
  border-radius: 0.3em;
}
</style>
