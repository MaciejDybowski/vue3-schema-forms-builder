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

      <!-- Parametry -->
      <v-list-item>
        <v-list-item-title class="py-2">{{ t('events.paramsLabel') }}</v-list-item-title>

        <div
          v-for="(item, key) in params"
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
            @click="removeItem(params, key)"
          />
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="small"
          @click="params.push({ title: null, value: null })"
        >
          {{ t('events.addParam') }}
        </v-btn>
      </v-list-item>

      <!-- Body -->
      <v-list-item>
        <v-list-item-title class="py-2">{{ t('events.bodyLabel') }}</v-list-item-title>

        <div
          v-for="(item, key) in bodyAttributes"
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
            @click="removeItem(bodyAttributes, key)"
          />
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="small"
          @click="bodyAttributes.push({ title: null, value: null })"
        >
          {{ t('events.addBodyItem') }}
        </v-btn>
      </v-list-item>
    </template>

    <!-- ========== CHANGE MODEL MODE ========== -->
    <template v-if="eventMode === 'change-model'">
      <v-list-item v-for="(item, key) in variables" :key="key" density="compact">
        <div class="d-flex py-2 align-center justify-center">
          <v-text-field
            v-model="item.path"
            :label="t('events.model.path')"
            class="pr-2"
            v-bind="style.inputStyle.value"
          />
          <v-text-field
            v-model="item.value"
            :label="t('events.model.value')"
            class="pl-2"
            v-bind="style.inputStyle.value"
          />
          <v-btn
            class="mx-2"
            density="compact"
            flat
            icon="mdi-delete"
            size="small"
            @click="removeItem(variables, key)"
          />
        </div>
      </v-list-item>

      <v-list-item density="compact">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="small"
          @click="variables.push({ path: null, value: null })"
        >
          {{ t('events.addVariable') }}
        </v-btn>
      </v-list-item>
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
import {cloneDeep, merge, set} from "lodash";

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

const eventModes = [
  {value: "action", title: t("events.actionLabel")},
  {value: "change-model", title: t("events.changeModelLabel")},
  {value: "emit-event", title: t("events.emitEventLabel")},
];

function setEventTypeOnSchema(value: string) {
  if (value) model.value[value] = {};
}

function setModeOnSchema(value: string) {
  if (eventType.value) model.value[eventType.value]["mode"] = value;
}

function setActionCode(value: string) {
  if (eventType.value) model.value[eventType.value]["code"] = value;
}

function setEventSignal(value: string) {
  if (eventType.value) model.value[eventType.value]["eventSignal"] = value;
}

function removeItem(list: any[], key: number) {
  list.splice(key, 1);
}

// --- Watchers ---
watch(params, () => {
  const paramsToMerge = Object.fromEntries(
    params.value.filter(p => p.title && p.value).map(p => [p.title, p.value])
  );
  if (eventType.value)
    model.value[eventType.value]["params"] = merge(model.value[eventType.value]["params"], paramsToMerge);
}, {deep: true});

watch(bodyAttributes, () => {
  const body = Object.fromEntries(
    bodyAttributes.value.filter(b => b.title && b.value).map(b => [b.title, b.value])
  );
  if (eventType.value) set(model.value[eventType.value], "body", body);
}, {deep: true});

watch(variables, () => {
  model.value.onChange.variables = cloneDeep(variables.value).map((item: any) => ({
    ...item,
    value: item.value === "null" ? null : isNaN(item.value) ? item.value : parseFloat(item.value),
  }));
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
    "events": {
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
      "addParam": "Add parameter",
      "bodyLabel": "Action/Request body",
      "addBodyItem": "Add body attribute",
      "addVariable": "Add variable",
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
        "value": "New value"
      }
    }
  },
  "pl": {
    "events": {
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
      "addParam": "Dodaj parametr",
      "bodyLabel": "Body akcji/żądania HTTP",
      "addBodyItem": "Dodaj atrybut body",
      "addVariable": "Dodaj zmienną",
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
        "value": "Nowa wartość"
      }
    }
  }
}
</i18n>
