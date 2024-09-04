<template>
  <v-list-item density="compact">
    <span>{{ t('simpleSource.title') }}</span>
  </v-list-item>
  <v-list-item>
    <v-switch
      v-model="modelValue.returnObject"
      :label="t('simpleSource.returnObject')"
      class="mx-2"

      hide-details="auto"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
  <v-list-item
    v-for="(item, key) in modelValue.items"
    density="compact"
  >
    <div class="d-flex py-2 align-center justify-center">
      <v-text-field
        :model-value="item.value"
        @update:model-value="(val) => parseValue(item, val)"
        :hide-details="true"
        :label="t('simpleSource.value')"
        class="pr-2"
        density="compact"
        v-bind="style.inputStyle.value"
      />
      <v-text-field
        v-model="item.title"
        :hide-details="true"
        :label="t('simpleSource.label')"
        class="pl-2"
        density="compact"
        v-bind="style.inputStyle.value"
      />
      <v-btn
        class="mx-2"
        density="compact"
        flat
        icon="mdi-delete"
        size="small"
        @click="deleteOption(key)"
      >
      </v-btn>
    </div>
  </v-list-item>
  <v-list-item density="compact">
    <v-btn
      color="primary"
      prepend-icon="mdi-plus"
      size="small"
      @click="addOption"
    >Dodaj
    </v-btn>
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";

const style = useStyle()
const {t} = useI18n()
const modelValue = defineModel<{
  items: Array<any>,
  returnObject: boolean
}>({
    default: () => {
      return {
        items: [],
        returnObject: false,
      }
    }
  }
)

function addOption() {
  modelValue.value.items.push({
    value: "changeMe",
    title: "changeMe"
  })
}

function parseValue(item, val: any) {
  if (val === "true" || val === "false") {
    item.value = val === "true"
  } else {
    item.value = val
  }
}

function deleteOption(key: number) {
  modelValue.value.items = modelValue.value.items.filter((n, t) => t !== key)
}
</script>

<style lang="scss" scoped>

</style>
<i18n lang="json">
{
  "en": {
    "simpleSource": {
      "title": "Options config",
      "value": "Value",
      "label": "Title",
      "addButton": "Add option",
      "returnObject": "Return object"
    }
  },
  "pl": {
    "simpleSource": {
      "title": "Konfiguracja opcji",
      "value": "ID",
      "label": "Etykieta",
      "addButton": "Dodaj opcję",
      "returnObject": "Zwracaj obiekt"
    }
  }
}
</i18n>

