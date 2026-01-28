<template>
  <expansion-panel
    :active="active"
    :title="t('events.title')"
    value="events"
  >
    <select-general
      v-model="eventType"
      :items="[{ value: 'onChange', title: t('events.onChangeLabel') }]"
      :label="t('events.typeLabel')"
      :return-object="false"
      clearable
      @update:model-value="setEventTypeOnSchema"
    />

    <select-general
      v-if="eventType"
      v-model="eventMode"
      :items="eventModes"
      :label="t('events.modeLabel')"
      :return-object="false"
      clearable
      @update:model-value="setModeOnSchema"
    />

    <!-- ========== ACTION MODE ========== -->
    <template v-if="eventMode === 'action'">
      <text-property-wrapper
        v-model="actionCode"
        :hint="t('events.actionCodeHint')"
        :label="t('events.actionCode')"
        persistent-hint
        @update:model-value="setActionCode"
      />

      <!-- Parametry (teraz w dialogu) -->
      <v-list-item>
        <v-list-item-title class="">{{ t('events.paramsLabel') }}</v-list-item-title>

        <div class="py-2">
          <v-chip
            v-for="(item, key) in displayParams"
            :key="item.title || key"
            class="ma-1"
            small
          >
            {{ item.title }}: {{ item.value }}
          </v-chip>
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="small"
          @click="openParamsDialog"
        >
          {{ t('events.addParam') }}
        </v-btn>
      </v-list-item>

      <!-- Dialog edycji parametrów -->
      <v-dialog v-model="paramsDialog" max-width="800">
        <v-card>
          <v-card-title>{{ t('events.paramsLabel') }}</v-card-title>
          <v-card-text>
            <div
              v-for="(item, key) in tempParamsList"
              :key="key"
              class="d-flex py-2 align-center justify-center"
            >
              <v-text-field
                v-model="item.title"
                :hide-details="true"
                :label="t('events.params.title')"
                class="pr-2"
                density="compact"
                v-bind="style.inputStyle.value"
              />
              <v-text-field
                v-model="item.value"
                :hide-details="true"
                :label="t('events.params.value')"
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
                @click="tempParams.splice(key, 1)"
              />
            </div>

            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              size="small"
              @click="tempParams.push({ title: null, value: null })"
            >
              {{ t('events.addParam') }}
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text @click="paramsDialog = false">{{ t('cancel') }}</v-btn>
            <v-btn color="primary" @click="saveParamsDialog">{{ t('save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Body (teraz w dialogu) -->
      <v-list-item>
        <v-list-item-title class="">{{ t('events.bodyLabel') }}</v-list-item-title>

        <div class="py-2">
          <v-chip
            v-for="(item, key) in displayBody"
            :key="item.title || key"
            class="ma-1"
            small
          >
            {{ item.title }}: {{ item.value }}
          </v-chip>
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="small"
          @click="openBodyDialog"
        >
          {{ t('events.addBodyItem') }}
        </v-btn>
      </v-list-item>

      <!-- Dialog edycji body -->
      <v-dialog v-model="bodyDialog" max-width="800">
        <v-card>
          <v-card-title>{{ t('events.bodyLabel') }}</v-card-title>
          <v-card-text>
            <div
              v-for="(item, key) in tempBodyList"
              :key="key"
              class="d-flex py-2 align-center justify-center"
            >
              <v-text-field
                v-model="item.title"
                :hide-details="true"
                :label="t('events.body.title')"
                class="pr-2"
                density="compact"
                v-bind="style.inputStyle.value"
              />
              <v-text-field
                v-model="item.value"
                :hide-details="true"
                :label="t('events.body.value')"
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
                @click="tempBody.splice(key, 1)"
              />
            </div>

            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              size="small"
              @click="tempBody.push({ title: null, value: null })"
            >
              {{ t('events.addBodyItem') }}
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text @click="bodyDialog = false">{{ t('cancel') }}</v-btn>
            <v-btn color="primary" @click="saveBodyDialog">{{ t('save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <!-- ========== CHANGE MODEL MODE ========== -->
    <template v-if="eventMode === 'change-model'">
      <v-list-item>
        <v-list-item-title >{{ t('events.variable') }}</v-list-item-title>

        <div class="py-2">
          <v-chip
            v-for="(item, key) in displayVariables"
            :key="item.path || key"
            class="ma-1"
            small
          >
            {{ item.path }}: {{ item.value }}
          </v-chip>
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="small"
          @click="openVariablesDialog"
        >
          {{ t('events.addVariable') }}
        </v-btn>
      </v-list-item>

      <!-- Dialog edycji zmiennych modelu -->
      <v-dialog v-model="variablesDialog" max-width="800">
        <v-card>
          <v-card-title>{{ t('events.addVariable') }}</v-card-title>
          <v-card-text>
            <div
              v-for="(item, key) in tempVariablesList"
              :key="key"
              class="d-flex py-2 align-center justify-center"
            >
              <v-text-field
                v-model="item.path"
                :hide-details="true"
                :label="t('events.model.path')"
                class="pr-2"
                density="compact"
                v-bind="style.inputStyle.value"
              />
              <v-text-field
                v-model="item.value"
                :hide-details="true"
                :label="t('events.model.value')"
                class="pl-2"
                density="compact"
                v-bind="style.inputStyle.value"
              />
              <v-text-field
                v-model="item.if"
                :hide-details="true"
                :label="t('events.model.if')"
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
                @click="tempVariables.splice(key, 1)"
              />
            </div>

            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              size="small"
              @click="tempVariables.push({ path: null, value: null })"
            >
              {{ t('events.addVariable') }}
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text @click="variablesDialog = false">{{ t('cancel') }}</v-btn>
            <v-btn color="primary" @click="saveVariablesDialog">{{ t('save') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <!-- ========== EMIT EVENT MODE ========== -->
    <template v-if="eventMode === 'emit-event'">
      <text-property-wrapper
        v-model="eventSignal"
        :hint="t('events.signalHint')"
        :label="t('events.signalLabel')"
        persistent-hint
        @update:model-value="setEventSignal"
      />
    </template>
  </expansion-panel>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref, watch} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import {useStyle} from "@/main";
import {cloneDeep, merge, set as lodashSet} from "lodash";

import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const {t} = useI18n();
const style = useStyle();

const props = defineProps<{ active: boolean }>();

const useBuilderStateStore = useBuilderState();
const model = computed({
  get: () => useBuilderStateStore.getConfiguredField,
  set: (val) => useBuilderStateStore.setConfiguredField(val),
});

const eventType = ref<string | null>(null);
const eventMode = ref<string | null>(null);
const actionCode = ref<string | null>(null);
const eventSignal = ref<string | null>(null);

const params = ref<Array<any>>([]);
const bodyAttributes = ref<Array<any>>([]);
const variables = ref<Array<any>>([]);

// dialogy i tymczasowe kopie
const paramsDialog = ref(false);
const bodyDialog = ref(false);
const tempParams = ref<Array<any>>([]);
const tempBody = ref<Array<any>>([]);

const eventModes = [
  {value: "action", title: t("events.actionLabel")},
  {value: "change-model", title: t("events.changeModelLabel")},
  {value: "emit-event", title: t("events.emitEventLabel")},
];

// Bezpieczne listy do użycia w szablonie (unikają undefined podczas renderu)
const paramsList = computed(() => Array.isArray(params.value) ? params.value : []);
const bodyList = computed(() => Array.isArray(bodyAttributes.value) ? bodyAttributes.value : []);
const tempParamsList = computed(() => Array.isArray(tempParams.value) ? tempParams.value : []);
const tempBodyList = computed(() => Array.isArray(tempBody.value) ? tempBody.value : []);
const variablesList = computed(() => Array.isArray(variables.value) ? variables.value : []);


const tempVariables = ref<Array<any>>([]);
const tempVariablesList = computed(() => Array.isArray(tempVariables.value) ? tempVariables.value : []);
const variablesDialog = ref(false);

// filtrowana lista do renderowania v-chip
const displayVariables = computed(() =>
  variablesList.value.filter(v => v && v.path != null && v.path !== '')
);

function openVariablesDialog() {
  tempVariables.value = cloneDeep(variables.value);
  variablesDialog.value = true;
}

function saveVariablesDialog() {
  variables.value = cloneDeep(tempVariables.value).map((item: any) => ({
    ...item,
    value: item.value === 'true' ? true : item.value === 'false' ? false : item.value,
  }));
  variablesDialog.value = false;
}

// Filtrowane listy do renderowania v-chip (usuwa v-if na tym samym elemencie co v-for)
const displayParams = computed(() =>
  paramsList.value.filter(p => p && p.title && p.value)
);
const displayBody = computed(() =>
  bodyList.value.filter(b => b && b.title && b.value)
);

function setEventTypeOnSchema(value: string) {
  if (!value) return;
  if (!model.value[value]) model.value[value] = {};
  model.value[value] = model.value[value] ?? {};
}

function setModeOnSchema(value: string) {
  if (!eventType.value) return;
  model.value[eventType.value] = model.value[eventType.value] ?? {};
  model.value[eventType.value]["mode"] = value;
}

function setActionCode(value: string) {
  if (!eventType.value) return;
  model.value[eventType.value] = model.value[eventType.value] ?? {};
  model.value[eventType.value]["code"] = value;
}

function setEventSignal(value: string) {
  if (!eventType.value) return;
  model.value[eventType.value] = model.value[eventType.value] ?? {};
  model.value[eventType.value]["eventSignal"] = value;
}

function removeItem(list: any[], key: number) {
  list.splice(key, 1);
}

function openParamsDialog() {
  tempParams.value = cloneDeep(params.value);
  paramsDialog.value = true;
}

function saveParamsDialog() {
  params.value = cloneDeep(tempParams.value);
  paramsDialog.value = false;
}

function openBodyDialog() {
  tempBody.value = cloneDeep(bodyAttributes.value);
  bodyDialog.value = true;
}

function saveBodyDialog() {
  bodyAttributes.value = cloneDeep(tempBody.value);
  bodyDialog.value = false;
}

// --- Watchers ---
watch(params, () => {
  const paramsToMerge = Object.fromEntries(
    (params.value ?? []).filter(p => p && p.title && p.value).map(p => [p.title, p.value])
  );
  if (eventType.value) {
    model.value[eventType.value] = model.value[eventType.value] ?? {};
    model.value[eventType.value]["params"] = merge(model.value[eventType.value]["params"] ?? {}, paramsToMerge);
  }
}, {deep: true});

watch(bodyAttributes, () => {
  const body = Object.fromEntries(
    (bodyAttributes.value ?? []).filter(b => b && b.title && b.value).map(b => [b.title, b.value])
  );
  if (eventType.value) {
    model.value[eventType.value] = model.value[eventType.value] ?? {};
    // używamy lodash set żeby bezpiecznie ustawić ścieżkę
    lodashSet(model.value, `${eventType.value}.body`, body);
  }
}, {deep: true});

watch(variables, () => {
  model.value.onChange = model.value.onChange ?? {};
  model.value.onChange.variables = cloneDeep(variables.value).map((item: any) => {
    let parsedValue = item.value;
    if (parsedValue === "null") {
      parsedValue = null;
    } else if (parsedValue === "true") {
      parsedValue = true;
    } else if (parsedValue === "false") {
      parsedValue = false;
    } else if (typeof parsedValue === 'string' && parsedValue !== '' && !isNaN(Number(parsedValue))) {
      parsedValue = parseFloat(parsedValue);
    }
    return {
      ...item,
      value: parsedValue,
    };
  });
}, {deep: true});

// --- Initialization ---
onMounted(() => {
  if ("onChange" in model.value) {
    eventType.value = "onChange";
    eventMode.value = model.value.onChange.mode;

    if (eventMode.value === "action") {
      actionCode.value = model.value.onChange.code;
      params.value = Object.entries(model.value.onChange.params ?? {}).map(([k, v]) => ({title: k, value: v}));
      bodyAttributes.value = Object.entries(model.value.onChange.body ?? {}).map(([k, v]) => ({title: k, value: v}));
    }

    if (eventMode.value === "change-model") {
      variables.value = model.value.onChange.variables?.map((v: any) => ({
        ...v,
        value: v.value === null ? "null" : v.value,
      })) ?? [];
    }

    if (eventMode.value === "emit-event") {
      eventSignal.value = model.value.onChange.eventSignal ?? null;
    }
  }
});
</script>


<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>

<i18n lang="json">
{
  "en": {
    "cancel": "Cancel",
    "save": "Save",
    "events": {
      "variable": "Variables",
      "title": "Events",
      "typeLabel": "Event type",
      "modeLabel": "Mode",
      "onChangeLabel": "On value change",
      "actionLabel": "Action",
      "changeModelLabel": "Model change",
      "emitEventLabel": "Emit event",
      "actionCode": "Action code",
      "actionCodeHint": "The action defined in Aurea Dashboard System Feature will be executed",
      "signalLabel": "Signal name",
      "signalHint": "Name of the emitted event e.g. refresh-attachments",
      "paramsLabel": "Action/Request parameters",
      "addParam": "Config parameter",
      "bodyLabel": "Action/Request body",
      "addBodyItem": "Config body attribute",
      "addVariable": "Config variable",
      "params": {
        "title": "Name",
        "value": "Value"
      },
      "body": {
        "title": "Name",
        "value": "Value"
      },
      "model": {
        "path": "Path",
        "value": "New value",
        "if": "Condition"
      }
    }
  },
  "pl": {
    "cancel": "Anuluj",
    "save": "Zapisz",
    "events": {
      "variable": "Zmienne",
      "title": "Zdarzenia",
      "typeLabel": "Rodzaj zdarzenia",
      "modeLabel": "Tryb",
      "onChangeLabel": "Przy zmianie wartości",
      "actionLabel": "Akcja",
      "changeModelLabel": "Zmiana modelu",
      "emitEventLabel": "Emituj zdarzenie",
      "actionCode": "Kod akcji",
      "actionCodeHint": "Wykonana zostanie akcja z definicji Feature systemu Aurea Dashboard",
      "signalLabel": "Nazwa sygnału",
      "signalHint": "Nazwa emitowanego zdarzenia np. refresh-attachments",
      "paramsLabel": "Parametry akcji/żądania HTTP",
      "addParam": "Konfiguruj parametry",
      "bodyLabel": "Body akcji/żądania HTTP",
      "addBodyItem": "Konfiguruj atrybut body",
      "addVariable": "Skonfiguruj zmienne",
      "params": {
        "title": "Nazwa",
        "value": "Wartość"
      },
      "body": {
        "title": "Nazwa",
        "value": "Wartość"
      },
      "model": {
        "path": "Ścieżka",
        "value": "Nowa wartość",
        "if": "Warunek"
      }
    }
  }
}
</i18n>
