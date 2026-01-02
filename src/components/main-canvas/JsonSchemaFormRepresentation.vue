<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex align-center">
        <span class="v-card-title ml-0 pl-0">{{ t('jsonRepresentationTitle') }}</span>
        <div>
          <v-btn
            density="compact"
            icon="mdi-content-copy"
            variant="text"
            @click="contextCopy"
          />
        </div>
        <v-spacer/>
        <div v-if="isSaveBtnShouldBeVisible">
          <v-btn
            v-model="saveSchema"
            :color="style.primaryWhite.value"
            :hide-details="true"
            :text="t('save')"
            class="mx-2"
            v-bind="style.buttonStyle.value"
            @click="saveEditedSchema"
          />
        </div>

      </div>

      <tcn-code-editor
        ref="codeEditorRef"
        v-model="editedSchema"
        :codemirrorOptions="{
           minimap: {
             enabled:false
           }
        }"
        height="80vh"
        language="json-custom"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {toast} from "vue3-toastify";
import {useStyle} from "@/main";
import {onMounted, ref, watch} from "vue";
import debounce from "lodash/debounce";

const props = defineProps<{
  schema: object
}>()

const emit = defineEmits<{
  (e: "manualUpdateSchema", schema: any): void;
}>();

const referenceSchema = ref()
const editedSchema = ref()
const saveSchema = ref()
const isSaveBtnShouldBeVisible = ref(false)


const codeEditorRef = ref<any>();
defineExpose({
  codeEditorRef
});

const {t} = useI18n()
const style = useStyle();

function contextCopy() {
  navigator.clipboard.writeText(JSON.stringify(props.schema));
  toast.success(t('copied'))
}

function saveEditedSchema() {
  emit("manualUpdateSchema", editedSchema.value)
}

function showWarningAboutParsingJson() {
  toast.warning("Wystąpił błąd podczas pasowania JSON")
}

function showSuccessAboutParsingJson() {
  if (!lastJSONWasInvalid.value) {
    toast.success("JSON został sparsowany poprawnie")
  }
}

const debounced = {
  showWarningAboutParsingJson: debounce(showWarningAboutParsingJson, 1500),
  showSuccessAboutParsingJson: debounce(showSuccessAboutParsingJson, 1500)
}
const lastJSONWasInvalid = ref(false)

onMounted(() => {
  referenceSchema.value = JSON.stringify(props.schema, null, 2)
  editedSchema.value = JSON.stringify(props.schema, null, 2)

  watch(() => editedSchema.value, (value, oldValue, onCleanup) => {
    try {
      const temp = JSON.parse(value);
      // @ts-ignore
      emit("manualUpdateSchema", value)
      if (lastJSONWasInvalid.value) {
        lastJSONWasInvalid.value = false
        debounced.showWarningAboutParsingJson.cancel()
        debounced.showSuccessAboutParsingJson()
      }
    } catch (e) {
      console.warn("JSON parsing error...");
      debounced.showSuccessAboutParsingJson.cancel()
      debounced.showWarningAboutParsingJson()
      lastJSONWasInvalid.value = true
    }

  }, {deep: true})
})
</script>

<style lang="scss" scoped>

</style>


<i18n lang="json">
{
  "en": {
    "jsonRepresentationTitle": "JSON Schema Form",
    "copied": "Copied",
    "edit": "Edit",
    "editSchema": "Edit schema",
    "save": "Save"
  },
  "pl": {
    "jsonRepresentationTitle": "JSON Schema Formularza",
    "copied": "Skopiowano",
    "edit": "Edytuj",
    "editSchema": "Edytuj schemat",
    "save": "Zapisz"
  }
}
</i18n>
