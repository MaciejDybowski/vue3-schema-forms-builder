<template>
  <boolean-checkbox-property-wrapper
    v-model="modelValue.returnObject"
    :label="t('simpleSource.returnObject')"
  >
    <template #append>
      <v-tooltip
        :text="t('simpleSource.returnObjectTooltip')"
        location="start"
        width="300"
      >
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">
            mdi-information-outline
          </v-icon>
        </template>
      </v-tooltip>
    </template>
  </boolean-checkbox-property-wrapper>

  <v-btn
    class="mt-2 mx-2"
    color="primary"
    prepend-icon="mdi-tune"
    size="small"
    width="355px"
    @click="advancedConfigDialog = true"
  >
    {{ t("simpleSource.showAdvanced") }}
  </v-btn>


  <div class="d-flex flex-column ga-2 mt-2 mx-2" style="max-width: 355px">
    <v-card
      v-for="(item, index) in computedItems"
      :key="index"
      class="pa-2 border-sm rounded"
      density="compact"
      elevation="0"
    >
      <div class="d-flex justify-space-between align-center mb-1">
        <strong>{{ t('simpleSource.option') }} {{ index + 1 }}</strong>

        <!-- Menu akcji -->
        <v-menu location="bottom end" transition="scale-transition">
          <template #activator="{ props }">
            <v-btn density="compact" icon="mdi-dots-vertical" size="small" v-bind="props" variant="text"/>
          </template>
          <v-list density="compact">
            <v-list-item :disabled="index === 0" @click="moveItem(index, index - 1)">
              <template #prepend>
                <v-icon size="small">mdi-chevron-up</v-icon>
              </template>
              <v-list-item-title>{{ t('moveUp') }}</v-list-item-title>
            </v-list-item>
            <v-list-item :disabled="index === computedItems.length - 1" @click="moveItem(index, index + 1)">
              <template #prepend>
                <v-icon size="small">mdi-chevron-down</v-icon>
              </template>
              <v-list-item-title>{{ t('moveDown') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteOption(item)">
              <template #prepend>
                <v-icon color="error" size="small">mdi-delete-outline</v-icon>
              </template>
              <v-list-item-title class="text-error">{{ t("delete") }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Pola value i title -->
      <v-text-field
        v-model="item.value"
        :label="t('simpleSource.value')"
        class="mb-2"
        density="compact"
        hide-details
        variant="outlined"
        @update:model-value="(val) => parseValue(item, val)"
      />

      <v-text-field
        v-if="typeof item.title === 'string'"
        v-model="item.title"
        :label="t('simpleSource.label')"
        density="compact"
        hide-details
        variant="outlined"
      />
      <v-text-field
        v-else
        v-model="item.title.$ref"
        :label="t('simpleSource.label')"
        density="compact"
        disabled
        hide-details
        variant="outlined"
      />
    </v-card>
  </div>


  <v-btn
    class="mt-2 mx-2"
    color="primary"
    prepend-icon="mdi-plus"
    size="small"
    width="355px"
    @click="addOption"
  >
    {{ t("simpleSource.addButton") }}
  </v-btn>

  <tcn-au-dialog
    v-if="advancedConfigDialog"
    v-model="advancedConfigDialog"
    :acceptColor="style.primaryWhite.value"
    :acceptText="t('close')"
    persistent
    scrollable
    width="1000px"
    @acceptButton="advancedConfigDialog = false"
  >
    <template #title>
      <v-card-title>{{ t("simpleSource.advancedConfigTitle") }}</v-card-title>
    </template>

    <v-card-text class="px-4">
      <div class="d-flex flex-column ga-2">
        <div
          v-for="(item, index) in computedItems"
          :key="index"
          class="border-sm rounded pa-3 text-sm"
        >
          <!-- Główna linia -->
          <v-row align="center" dense>
            <v-col cols="4">
              <v-text-field
                v-model="item.value"
                :label="t('simpleSource.value')"
                class="tiny-label"
                density="compact"
                hide-details
                variant="outlined"
                @update:model-value="(val) => parseValue(item, val)"
              />
            </v-col>

            <v-col cols="4">
              <text-property-wrapper
                v-if="typeof item.title === 'string'"
                v-model="item.title"
                :label="t('simpleSource.label')"
                class="tiny-label"
              />
              <text-property-wrapper
                v-else
                v-model="item.title.$ref"
                :label="t('simpleSource.label')"
                class="tiny-label"
                disabled
              />
            </v-col>

            <v-col class="d-flex align-center justify-center" cols="3">
              <boolean-checkbox-property-wrapper
                v-model="item.isReference"
                :label="t('simpleSource.useReference')"
                class="tiny-label"
                @change="() => handleReferenceChange(item)"
              />
            </v-col>

            <v-col class="d-flex justify-end ga-1" cols="1">
              <v-btn
                :disabled="index === 0"
                icon="mdi-chevron-up"
                size="small"
                variant="text"
                @click="moveItem(index, index - 1)"
              />
              <v-btn
                :disabled="index === computedItems.length - 1"
                icon="mdi-chevron-down"
                size="small"
                variant="text"
                @click="moveItem(index, index + 1)"
              />
              <v-btn
                color="error"
                icon="mdi-delete-outline"
                size="small"
                variant="text"
                @click="deleteOption(item)"
              />
            </v-col>
          </v-row>

          <!-- Sekcja dla checkbox -->
          <div
            v-if="field.layout.component === 'checkbox'"
            class="mt-1"
          >
            <v-card-subtitle
              v-if="!item.disabledCondition"
              class="link cursor-pointer text-primary text-sm pa-0 ma-0"
              @click="item.disabledCondition = 'changeMe'"
            >
              {{ t('simpleSource.addDisabledCondition') }}
            </v-card-subtitle>

            <text-property-wrapper
              v-else
              v-model="item.disabledCondition"
              :label="t('simpleSource.disabledCondition')"
              class="tiny-label pa-0 ma-0"
            />
          </div>
        </div>
      </div>

      <!-- Przycisk dodania -->
      <v-btn
        block
        class="mt-4"
        color="primary"
        prepend-icon="mdi-plus"
        size="small"
        @click="addOption"
      >
        {{ t('simpleSource.addButton') }}
      </v-btn>
    </v-card-text>


  </tcn-au-dialog>

</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import {useBuilderState} from "@/pinia/useBuilderState";
import {useTranslateInput} from "@/composables/useTranslateInput";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const {t} = useI18n();
const style = useStyle();
const {prefix, toCamelCase} = useTranslateInput();
const advancedConfigDialog = ref(false);
const expandedRows = ref<any[]>([]);

const useBuilderStateStore = useBuilderState();
const field = computed({
  get: () => useBuilderStateStore.getConfiguredField,
  set: (val) => useBuilderStateStore.setConfiguredField(val),
});

const modelValue = defineModel<{
  items: Array<any>;
  returnObject: boolean;
}>({
  default: () => ({
    items: [],
    returnObject: false,
  }),
});

const computedItems = computed({
  get: () => modelValue.value.items,
  set: (val) => (modelValue.value.items = val),
});

const headers = [
  {title: t("simpleSource.value"), key: "value"},
  {title: t("simpleSource.label"), key: "title"},
  {title: t("simpleSource.useReference"), key: "isReference", align: "center", width: 120},
  {title: "", key: "actions", sortable: false, align: "end", width: 100},
] as any;

function moveItem(from: number, to: number) {
  const items = [...computedItems.value];
  const item = items.splice(from, 1)[0];
  items.splice(to, 0, item);
  computedItems.value = items;
}

function addOption() {
  modelValue.value.items.push({value: "changeMe", title: "changeMe"});
}

function parseValue(item, val: any) {
  if (val === "true" || val === "false") item.value = val === "true";
  else item.value = val;
}

function deleteOption(obj: any) {
  computedItems.value = computedItems.value.filter(
    (item) => item.value !== obj.value
  );
}

// Dialog konfiguracji
const currentConfiguredOption = ref<any>(null);
const configOptionDialog = ref(false);
const updateWhenSaveModel = ref<any>(null);

function configOption(option: any) {
  updateWhenSaveModel.value = option;
  currentConfiguredOption.value = {...option};
  currentConfiguredOption.value.isReference =
    typeof currentConfiguredOption.value.title !== "string";
  configOptionDialog.value = true;
}

function closeConfigItemDialog() {
  updateWhenSaveModel.value = null;
  configOptionDialog.value = false;
  currentConfiguredOption.value = null;
}

function saveConfigAndClose() {
  if (updateWhenSaveModel.value)
    Object.assign(updateWhenSaveModel.value, currentConfiguredOption.value);
  closeConfigItemDialog();
}

function handleReferenceChange(item: any) {
  if (item.isReference) {
    item.title = {$ref: prefix + toCamelCase(item.title)};
  } else {
    item.title = item.title?.$ref?.replace(prefix, "") || "";
  }
}


// Dynamiczny tytuł
const dynamicItemTitle = computed({
  get: () =>
    typeof currentConfiguredOption.value?.title === "string"
      ? currentConfiguredOption.value.title
      : currentConfiguredOption.value?.title?.$ref?.replace(prefix, "") ?? "",
  set: (value: string) => {
    currentConfiguredOption.value.title = currentConfiguredOption.value
      .isReference
      ? {$ref: prefix + value.trim()}
      : value;
  },
});

function referenceChangedItemTitle() {
  if (!currentConfiguredOption.value) return;
  if (currentConfiguredOption.value.isReference) {
    currentConfiguredOption.value.title = {
      $ref: prefix + toCamelCase(currentConfiguredOption.value.title),
    };
  } else {
    currentConfiguredOption.value.title =
      currentConfiguredOption.value.title?.$ref?.replace(prefix, "") || "";
  }
}
</script>

<style scoped>
.tiny-label :deep(.v-label) {
  font-size: 0.75rem !important;
  line-height: 1.1 !important;
}

.tiny-label :deep(input),
.tiny-label :deep(textarea) {
  font-size: 0.8rem !important;
}

.text-sm {
  font-size: 0.85rem;
}

.pa-0 {
  padding: 0 !important;
}

.ma-0 {
  margin: 0 !important;
}

</style>


<i18n lang="json">
{
  "en": {
    "save": "Save",
    "delete": "Delete",
    "moveUp": "Move up",
    "moveDown": "Move down",
    "close": "Close",
    "simpleSource": {
      "showAdvanced": "Show advanced configuration",
      "advancedConfigTitle": "Advanced configuration",
      "option": "Option",
      "title": "Option configuration",
      "value": "Value",
      "label": "Label",
      "addButton": "Add option",
      "returnObject": "Save object",
      "returnObjectTooltip": "If enabled, the entire object containing, for example, the identifier and label will be saved in the form model. If disabled, only the valueMapping defined in the dictionary URL will be saved in the model.",
      "useReference": "Use reference",
      "disabledCondition": "Disabled condition",
      "addDisabledCondition": "Click to define a disabled condition",
      "useReferenceInfo": "This option allows you to use the reference mechanism for translating form fields. These translations should be properly prepared on the service side that handles the given form."
    }
  },
  "pl": {
    "save": "Zapisz",
    "delete": "Usuń",
    "moveUp": "Przesuń w górę",
    "moveDown": "Przesuń w dół",
    "close": "Zamknij",
    "simpleSource": {
      "showAdvanced": "Pokaż konfigurację zaawansowaną",
      "advancedConfigTitle": "Konfiguracja zaawansowana",
      "option": "Opcja",
      "title": "Konfiguracja opcji",
      "value": "Wartość",
      "label": "Etykieta",
      "addButton": "Dodaj opcję",
      "returnObject": "Zwracaj obiekt",
      "returnObjectTooltip": "Jeżeli opcja jest włączona, w modelu formularza zapisywany będzie cały obiekt, zawierający na przykład identyfikator oraz etykietę. Gdy opcja jest wyłączona, w modelu zapisywane będzie wyłącznie valueMapping zdefiniowane w adresie URL słownika",
      "useReference": "Użyj referencji",
      "disabledCondition": "Warunek wyłączenia",
      "addDisabledCondition": "Kliknij, aby zdefiniować warunek wyłączenia",
      "useReferenceInfo": "Opcja ta umożliwia na użycie mechanizmu referencji to tłumaczeń pól formularza. Tłumaczenia te powinny zostać przygotowane w odpowiedni sposób po stronie usługi, która obsługuje dany formularz."
    }
  }
}
</i18n>
