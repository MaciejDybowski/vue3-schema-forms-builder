<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex align-center">
        <span class="v-card-title ml-0 pl-0">{{ t('jsonRepresentationTitle') }}</span>
        <div>
          <v-btn
            icon="mdi-content-copy"
            variant="text"
            density="compact"
            @click="contextCopy"
          />
        </div>
      </div>
      <vue-json-pretty :data="schema as any"/>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import VueJsonPretty from "vue-json-pretty";
import {useI18n} from "vue-i18n";
import {toast} from "vue3-toastify";

const props = defineProps<{
  schema: object
}>()

const {t} = useI18n()

function contextCopy() {
  navigator.clipboard.writeText(JSON.stringify(props.schema));
  toast.success(t('copied'))
}
</script>

<style scoped lang="scss">

</style>


<i18n lang="json">
{
  "en": {
    "jsonRepresentationTitle": "JSON Schema Form",
    "copied": "Copied"
  },
  "pl": {
    "jsonRepresentationTitle": "JSON Schema Formularza",
    "copied": "Skopiowano"
  }
}
</i18n>
