import {ref} from "vue";

export function useCodeEditorDialog() {
  const showAdvancedDialog = ref(false);
  const modelInDialog = ref<any>(null);

  function openAdvancedDialog(val: any) {
    modelInDialog.value = val;
    showAdvancedDialog.value = true;
  }

  function saveContent() {
    showAdvancedDialog.value = false
    return modelInDialog.value
  }

  function closeDialog() {
    modelInDialog.value = null
    showAdvancedDialog.value = false;
  }

  return {openAdvancedDialog, modelInDialog, showAdvancedDialog, saveContent, closeDialog};
}
