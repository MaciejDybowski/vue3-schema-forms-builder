<template>
  <!-- Przełącznik zwracania obiektu -->
  <boolean-switch-property-wrapper
    v-model="modelValue.returnObject"
    :label="t('simpleSource.returnObject')"
  />

  <!-- Lista opcji -->
  <draggable
    v-model="computedItems"
    :animation="250"
    :group="'controls'"
    :sort="true"
    class="d-flex flex-wrap v-row pl-3"
    ghost-class="ghost"
    handle=".draggable-icon"
    item-key="value"
  >
    <template #item="{ element }">
      <div>
        <v-row class="pa-0 ma-0 align-center" dense>
          <!-- Wartość -->
          <v-col class="pa-0 ma-0" cols="4">
            <text-property-wrapper
              :grow-enabled="false"
              :label="t('simpleSource.value')"
              :model-value="element.value"
              class="pr-1"
              @update:model-value="(val) => parseValue(element, val)"
            />
          </v-col>

          <!-- Etykieta -->
          <v-col class="pa-0 ma-0" cols="5">
            <text-property-wrapper
              v-if="typeof element.title === 'string'"
              v-model="element.title"
              :grow-enabled="false"
              :label="t('simpleSource.label')"
              class="pl-1 pr-1"
            />
            <text-property-wrapper
              v-else
              v-model="element.title.$ref"
              :disabled="true"
              :grow-enabled="false"
              :label="t('simpleSource.label')"
              class="pl-1 pr-1"
            />
          </v-col>

          <!-- Akcje -->
          <v-col class="pa-0 ma-0 d-flex justify-end" cols="3">
            <v-btn
              density="compact"
              flat
              icon="mdi-cog"
              size="small"
              @click="configOption(element)"
            />
            <v-btn
              density="compact"
              flat
              icon="mdi-delete"
              size="small"
              @click="deleteOption(element)"
            />
            <v-icon class="draggable-icon cursor-grab" size="small">
              mdi-drag-vertical
            </v-icon>
          </v-col>
        </v-row>

        <!-- Warunek disabled (checkboxy) -->
        <v-row
          v-if="field.layout.component === 'checkbox'"
          class="pa-0 ma-0"
          dense
        >
          <v-col class="pa-0 ma-0" cols="12">
            <v-card-subtitle
              v-if="!element.disabledCondition"
              class="link cursor-pointer"
              @click="element.disabledCondition = 'changeMe'"
            >
              {{ t('simpleSource.addDisabledCondition') }}
            </v-card-subtitle>

            <text-property-wrapper
              v-else
              v-model="element.disabledCondition"
              :label="t('simpleSource.disabledCondition')"
              class="mt-1 mr-4"
            />
          </v-col>
        </v-row>
      </div>
    </template>
  </draggable>

  <!-- Przycisk dodawania -->
  <v-list-item>
    <v-btn
      class="mt-4"
      color="primary"
      prepend-icon="mdi-plus"
      size="small"
      @click="addOption"
    >
      {{ t('simpleSource.addButton') }}
    </v-btn>
  </v-list-item>

  <!-- Dialog konfiguracji opcji -->
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
      <v-card-title>{{ t('simpleSource.title') }}</v-card-title>
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
      <boolean-checkbox-property-wrapper
        v-model="currentConfiguredOption.isReference"
        :label="t('simpleSource.useReference')"
        @change="referenceChangedItemTitle"
      >
        <template #append>
          <v-tooltip
            location="left"
            width="300"
          >
            <template #activator="{ props }">
              <v-icon
                v-bind="props">
                mdi-information-outline
              </v-icon>
            </template>
            <span>{{ t('simpleSource.useReferenceInfo') }}</span>
          </v-tooltip>
        </template>
      </boolean-checkbox-property-wrapper>

      <!-- Warunek disabled -->
      <v-row
        v-if="field.layout.component === 'checkbox'"
        class="pa-0 ma-0"
        dense
      >
        <v-col class="pa-0 ma-0" cols="12">
          <v-card-subtitle
            v-if="!currentConfiguredOption.disabledCondition"
            class="link cursor-pointer"
            @click="currentConfiguredOption.disabledCondition = 'changeMe'"
          >
            {{ t('simpleSource.addDisabledCondition') }}
          </v-card-subtitle>

          <text-property-wrapper
            v-else
            v-model="currentConfiguredOption.disabledCondition"
            :label="t('simpleSource.disabledCondition')"
            class="mt-1"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </tcn-au-dialog>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import {useBuilderState} from "@/pinia/useBuilderState";
import {useTranslateInput} from "@/composables/useTranslateInput";
import Draggable from "@/vuedraggable/vuedraggable";

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

// Funkcje
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

// Zmiana tytułu dynamicznego
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

<style lang="scss" scoped>
.link {
  color: var(--v-theme-primary);
  font-size: 0.9rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>

<i18n lang="json">
{
  "en": {
    "save": "Save",
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
