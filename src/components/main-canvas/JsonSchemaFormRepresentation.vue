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
        <div>
          <v-btn
            v-if="editSchema"
            :color="style.primaryWhite.value"
            v-bind="style.buttonStyle.value"
            :text="t('save')"
            :hide-details="true"
            v-model="saveSchema"
            class="mx-2"
            @click="saveEditedSchema"
          />
        </div>
        <div>
          <v-switch
            :color="style.primaryWhite.value"
            :label="t('edit')"
            :hide-details="true"
            v-model="editSchema"
            @change="copySchema"
          />
        </div>
      </div>
      <vue-json-pretty
        v-if="!editSchema"
        :data="schema as any"
      />
      <v-textarea
        v-if="editSchema"
        v-model="editedSchema"
        v-bind="style.inputStyle.value"
        :label="t('editSchema')"
        rows="20"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import {useI18n} from "vue-i18n";
import {toast} from "vue3-toastify";
import {useStyle} from "@/main";
import {ref} from "vue";

const props = defineProps<{
  schema: object
}>()

const emit = defineEmits<{
  (e: "manualUpdateSchema", schema: any): void;
}>();

const editSchema = ref(false)
const editedSchema = ref()
const saveSchema = ref()

const {t} = useI18n()
const style = useStyle();

function contextCopy() {
  navigator.clipboard.writeText(JSON.stringify(props.schema));
  toast.success(t('copied'))
}

function copySchema() {
  editedSchema.value = JSON.stringify(props.schema)
}

function saveEditedSchema() {
  emit("manualUpdateSchema", editedSchema.value)
}
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
