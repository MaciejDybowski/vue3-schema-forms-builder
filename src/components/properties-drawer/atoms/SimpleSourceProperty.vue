<template>
  <!-- Przełącznik zwracania obiektu -->
  <boolean-switch-property-wrapper
    v-model="modelValue.returnObject"
    :label="t('simpleSource.returnObject')"
  />

  <!-- Kompaktowa tabela -->
  <v-data-table
    :headers="headers"
    :items="computedItems"
    class="elevation-0 border-sm rounded mx-2"
    density="compact"
    hide-default-footer
    style="max-width: 355px"
  >
    <!-- Wartość -->
    <template #item.value="{ item }">
      <v-text-field
        v-model="item.value"
        class="table-input"
        density="compact"
        hide-details
        variant="outlined"
        @update:model-value="(val) => parseValue(item, val)"
      />
    </template>

    <!-- Etykieta -->
    <template #item.title="{ item }">
      <v-text-field
        v-if="typeof item.title === 'string'"
        v-model="item.title"
        class="table-input"
        density="compact"
        hide-details
        variant="outlined"
      />
      <v-text-field
        v-else
        v-model="item.title.$ref"
        class="table-input"
        density="compact"
        disabled
        hide-details
        variant="outlined"
      />
    </template>

    <!-- Akcje (menu 3 kropki) -->
    <template #item.actions="{ item }">
      <v-menu location="bottom end" transition="scale-transition">
        <template #activator="{ props }">
          <v-btn
            density="compact"
            icon="mdi-dots-vertical"
            size="small"
            v-bind="props"
            variant="text"
          />
        </template>
        <v-list density="compact">
          <v-list-item @click="configOption(item)">
            <template #prepend>
              <v-icon size="small">mdi-cog-outline</v-icon>
            </template>
            <v-list-item-title>{{ t("simpleSource.title") }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteOption(item)">
            <template #prepend>
              <v-icon color="error" size="small">mdi-delete-outline</v-icon>
            </template>
            <v-list-item-title class="text-error">
              {{ t("delete") }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>

  <!-- Przycisk dodania -->
  <v-btn
    block
    class="mt-2"
    color="primary"
    prepend-icon="mdi-plus"
    size="small"
    variant="tonal"
    @click="addOption"
  >
    {{ t("simpleSource.addButton") }}
  </v-btn>

  <!-- Dialog konfiguracji (bez zmian) -->
  <tcn-au-dialog
    v-if="configOptionDialog"
    v-model="configOptionDialog"
    :acceptColor="style.primaryWhite.value"
    :acceptText="t('save')"
    persistent
    scrollable
    width="800px"
    @acceptButton="saveConfigAndClose"
    @closeButton="closeConfigItemDialog"
  >
    <template #title>
      <v-card-title>{{ t("simpleSource.title") }}</v-card-title>
    </template>

    <v-card-text class="px-0">
      <text-property-wrapper
        :label="t('simpleSource.value')"
        :model-value="currentConfiguredOption.value"
        @update:model-value="(val) => parseValue(currentConfiguredOption, val)"
      />
      <text-property-wrapper
        v-model="dynamicItemTitle"
        :label="t('simpleSource.label')"
        :prefix="currentConfiguredOption.isReference ? prefix : ''"
      />


      <template v-if="field.layout.component == 'checkbox'">
        <v-card-subtitle
          v-if="!currentConfiguredOption.disabledCondition"
          class="link cursor-pointer mt-4"
          @click="currentConfiguredOption.disabledCondition = 'changeMe'"
        >
          {{ t('simpleSource.addDisabledCondition') }}
        </v-card-subtitle>

        <text-property-wrapper
          v-else
          v-model="currentConfiguredOption.disabledCondition"
          :label="t('simpleSource.disabledCondition')"
          class="mt-1 mr-4"
        />
      </template>


      <boolean-checkbox-property-wrapper
        v-model="currentConfiguredOption.isReference"
        :label="t('simpleSource.useReference')"
        @change="referenceChangedItemTitle"
      >
        <template #append>
          <v-tooltip location="left" width="300">
            <template #activator="{ props }">
              <v-icon v-bind="props">mdi-information-outline</v-icon>
            </template>
            <span>{{ t('simpleSource.useReferenceInfo') }}</span>
          </v-tooltip>
        </template>
      </boolean-checkbox-property-wrapper>
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
import BooleanSwitchPropertyWrapper from "@/components/properties-drawer/atoms/BooleanSwitchPropertyWrapper.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";

const {t} = useI18n();
const style = useStyle();
const {prefix, toCamelCase} = useTranslateInput();

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
  {title: "", key: "actions", sortable: false, align: "end", width: 36},
];

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
.table-input {
  max-width: 120px;
  font-size: 0.8rem;
}

.v-data-table {
  --v-table-header-height: 32px;
  font-size: 0.85rem;
}
</style>


<i18n lang="json">
{
  "en": {
    "save": "Save",
    "delete": "Delete",
    "simpleSource": {
      "title": "Option configuration",
      "value": "Value",
      "label": "Label",
      "addButton": "Add option",
      "returnObject": "Return object",
      "useReference": "Use reference",
      "disabledCondition": "Disabled condition",
      "addDisabledCondition": "Click to define a disabled condition",
      "useReferenceInfo": "This option allows you to use the reference mechanism for translating form fields. These translations should be properly prepared on the service side that handles the given form."
    }
  },
  "pl": {
    "save": "Zapisz",
    "delete": "Usuń",
    "simpleSource": {
      "title": "Konfiguracja opcji",
      "value": "Wartość",
      "label": "Etykieta",
      "addButton": "Dodaj opcję",
      "returnObject": "Zwracaj obiekt",
      "useReference": "Użyj referencji",
      "disabledCondition": "Warunek wyłączenia",
      "addDisabledCondition": "Kliknij, aby zdefiniować warunek wyłączenia",
      "useReferenceInfo": "Opcja ta umożliwia na użycie mechanizmu referencji to tłumaczeń pól formularza. Tłumaczenia te powinny zostać przygotowane w odpowiedni sposób po stronie usługi, która obsługuje dany formularz."
    }
  }
}
</i18n>
