<template>
  <v-row>
    <v-col cols="12">
      <span class="v-list-item-subtitle">{{ t('funcDescription') }}</span>
    </v-col>
    <v-col cols="5">
      <v-textarea
        v-model="jsonSchemaBefore"
        v-bind="style.inputStyle.value"
        :label="t('labelBefore')"
        rows="20"
      />
    </v-col>
    <v-col cols="2" class="flex-column justify-center">
      <v-btn
        :disabled="!jsonSchemaBefore"
        @click="transform"
        :color="style.primaryWhite.value"
        v-bind="style.buttonStyle.value"
        class="mb-4"
      >{{ t('change') }}
      </v-btn>
      <v-btn
        :color="style.primaryWhite.value"
        v-bind="style.buttonStyle.value"
        :text="t('saveClipboard')"
        :disabled="!jsonSchemaAfter"
        @click="copy(jsonSchemaAfter)"
        class="my-4"
      />
    </v-col>
    <v-col cols="5"
           class="d-flex">
      <vue-json-pretty
        v-if="jsonSchemaAfter"
        :data="jsonSchemaAfter"/>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {useStyle} from "@/main";
import {useI18n} from "vue-i18n";
import {onMounted, Ref, ref} from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import {FormOptions} from "@/models/FormOptions";
import {copyObject} from "@/utils/copy";
import {useSchemaMapper} from "@/composables/useSchemaMapper";
import {useDraggableMapper} from "@/composables/useDraggableMapper";
import {DraggableFormElement} from "@/models/DraggableFormElement";
import {useDrawers} from "@/composables/useDrawers";
import {toast} from "vue3-toastify";

const {t} = useI18n()
const style = useStyle()
const drawers = useDrawers();
const {mapDraggableToSchema} = useSchemaMapper()
const {mapSchemaToDraggable} = useDraggableMapper()

const jsonSchemaBefore = ref(null)
const jsonSchemaAfter = ref(null)
const tempDraggableModel: Ref<DraggableFormElement[]> = ref([])


function transform() {
  const formOptions: FormOptions = {
    fieldProps: style.inputStyle.value,
    buttonProps: style.buttonStyle.value
  }

  // @ts-ignore
  tempDraggableModel.value = mapSchemaToDraggable(copyObject(JSON.parse(jsonSchemaBefore.value)), formOptions)
  // @ts-ignore
  jsonSchemaAfter.value = mapDraggableToSchema(copyObject(tempDraggableModel.value))
}

function copy(val: any) {
  navigator.clipboard.writeText(JSON.stringify(val));
  toast.success(t('copied'))
}

onMounted(() => {
  drawers.propertiesDrawer.value = false
  drawers.elementsDrawer.value = false
})

</script>

<style scoped lang="scss">

</style>


<i18n lang="json">
{
  "en": {
    "funcDescription": "The process of simplifying a JSON object reduces its structure to its simplest form, minimizing the amount of data to the minimum necessary.",
    "labelBefore": "JSON to clean",
    "change": "Make simple",
    "saveClipboard": "Save to clipboard",
    "copied": "Copied"
  },
  "pl": {
    "funcDescription": "Proces upraszczania obiektu JSON redukuje jego strukturę do najprostszej formy, minimalizując ilość danych do niezbędnego minimum.",
    "labelBefore": "JSON do transformacji",
    "change": "Uprość",
    "saveClipboard": "Kopiuj wynik do schowka",
    "copied": "Skopiowano"
  }
}
</i18n>
