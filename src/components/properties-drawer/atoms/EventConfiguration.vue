<template>
  <expansion-panel
    :active="active"
    :title="t('events')"
    value="events"
  >
    <select-general
      v-model="eventType"
      :items="[{value: 'onChange', title: t('onChangeLabel')}]"
      :label="t('eventType')"
      :return-object="false"
      clearable
      @update:model-value="setEventTypeOnSchema"
    />
    <select-general
      v-if="eventType"
      v-model="eventMode"
      :items="[{value: 'action', title: t('actionLabel')}, {value: 'change-model', title: t('changeModelLabel')}, {value: 'emit-event', title: t('emitEventLabel')}]"
      :label="t('mode')"
      :return-object="false"
      clearable
      @update:model-value="setModeOnSchema"
    />

    <div v-if="eventMode=='action'">
      <textfield-general
        v-model="actionCode"
        :label="t('actionCode')"
        @update:model-value="setActionCOde"
      />

      <v-list-item>
        <v-list-item-title class="py-2">
          {{ t('paramsLabel') }}
        </v-list-item-title>
        <div v-for="(item, key) in params"
             :key="key"
             class="d-flex py-2 align-center justify-center"
        >
          <v-text-field
            v-model="item.title"
            :hide-details="true"
            :label="t('params.title')"
            class="pr-2"
            density="compact"
            v-bind="style.inputStyle.value"

          />
          <v-text-field
            v-model="item.value"
            :hide-details="true"
            :label="t('params.value')"
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
            @click="params = params.filter((v, i) => i !== key)"
          >
          </v-btn>
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="small"
          @click="params.push({title: null, value: null})"
        >Dodaj
        </v-btn>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="py-2">
          {{ t('bodyAttributesLabel') }}
        </v-list-item-title>
        <div v-for="(item, key) in bodyAttributes"
             :key="key"
             class="d-flex py-2 align-center justify-center"
        >
          <v-text-field
            v-model="item.title"
            :hide-details="true"
            :label="t('bodyAttributes.title')"
            class="pr-2"
            density="compact"
            v-bind="style.inputStyle.value"

          />
          <v-text-field
            v-model="item.value"
            :hide-details="true"
            :label="t('bodyAttributes.value')"
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
            @click="bodyAttributes = bodyAttributes.filter((v, i) => i !== key)"
          >
          </v-btn>
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="small"
          @click="bodyAttributes.push({title: null, value: null})"
        >Dodaj
        </v-btn>
      </v-list-item>
    </div>
    <div v-if="eventMode=='change-model'">
      <v-list-item
        v-for="(item, key) in variables"
        density="compact"
      >
        <div class="d-flex py-2 align-center justify-center">
          <v-text-field
            v-model="item['path']"
            class="pr-2"
            label="Ścieżka"
            v-bind="style.inputStyle.value"
          />
          <v-text-field
            v-model="item['value']"
            class="pl-2"
            label="Nowa wartość"
            v-bind="style.inputStyle.value"
          />
          <v-btn
            class="mx-2"
            density="compact"
            flat
            icon="mdi-delete"
            size="small"
            @click="variables = variables.filter((n, t) => t !== key)"
          >
          </v-btn>
        </div>
      </v-list-item>
      <v-list-item density="compact">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          size="small"
          @click="variables.push({path: null, value: null})"
        >Dodaj
        </v-btn>
      </v-list-item>
    </div>
    <div v-if="eventMode=='emit-event'">
      <v-list-item
        v-for="(item, key) in variables"
        density="compact"
      >
        <div class="d-flex py-2 align-center justify-center">
          <v-text-field
            v-model="item['path']"
            class="pr-2"
            label="Ścieżka"
            v-bind="style.inputStyle.value"
          />
          <v-text-field
            v-model="item['value']"
            class="pl-2"
            label="Nowa wartość"
            v-bind="style.inputStyle.value"
          />
          <v-btn
            class="mx-2"
            density="compact"
            flat
            icon="mdi-delete"
            size="small"
            @click="variables = variables.filter((n, t) => t !== key)"
          >
          </v-btn>
        </div>
      </v-list-item>
      <textfield-general
        v-model="eventSignal"
        :label="t('eventSignal')"
        @update:model-value="setEventSignal"
      />
    </div>
  </expansion-panel>
</template>


<script lang="ts" setup>

import SelectGeneral from "@/components/properties-drawer/atoms/SelectGeneral.vue";
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref, watch} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {cloneDeep, merge} from "lodash";
import {useStyle} from "@/main";
import set from "lodash/set";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";

const {t} = useI18n()
const style = useStyle()

const props = defineProps<{
  active: boolean
}>()


const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const eventType = ref<any>(null)

function setEventTypeOnSchema(value: string) {
  model.value[value] = {}
}

const eventMode = ref(null)

function setModeOnSchema(value: string) {
  if (eventType.value) {
    model.value[eventType.value]['mode'] = value
  }
}

const actionCode = ref(null)

function setActionCOde(value: string) {
  if (eventType.value) {
    model.value[eventType.value]['code'] = value
  }
}

const eventSignal = ref(null)
function setEventSignal(value: string) {
  if (eventType.value) {
    model.value[eventType.value]['eventSignal'] = value
  }
}


const params = ref<Array<any>>([
  {
    title: null,
    value: null
  }
])
watch(params, () => {
  let paramsToMerge: Record<string, string | number | boolean> = {}
  params.value.forEach((item) => {
    if (item.title && item.value) {
      paramsToMerge[item.title] = item.value
    }
  })

  if (paramsToMerge && eventType.value) {
    model.value[eventType.value]['params'] = merge(model.value[eventType.value]['params'], paramsToMerge)
  }
}, {deep: true})


const bodyAttributes = ref<Array<any>>([
  {
    title: null,
    value: null
  }
])
watch(bodyAttributes, () => {
  let body = {}
  bodyAttributes.value.forEach((item) => {
    if (item.title && item.value) {
      body[item.title] = item.value
    }
  })
  if (body && eventType.value) {

    set(model.value[eventType.value], 'body', body)
  }
}, {deep: true})


// onChange - model change
const variables = ref<Array<any>>([])
watch(variables, () => {
  model.value.onChange.variables = cloneDeep(variables.value).map((item: any) => {
    if (item['value'] === "null") {
      item['value'] = null
    }

    if (!isNaN(item['value'])) {
      item['value'] = parseFloat(item['value'])
    }
    return item
  })
}, {deep: true})

onMounted(() => {
  eventType.value = "onChange" in model.value ? "onChange" : null
  eventMode.value = model.value['onChange']?.mode

  if (eventMode.value == "action") {

    params.value = Object.entries(model.value['onChange'].params).map(([k, v]) => {
      return {
        title: k,
        value: v,
      }
    })
    actionCode.value = model.value['onChange'].code
    bodyAttributes.value = Object.entries(model.value['onChange'].body).map(([k, v]) => {
      return {
        title: k,
        value: v,
      }
    })
  }

  if (eventMode.value == "change-model") {
    variables.value = model.value['onChange'].variables.map((item: any) => {
      if (item['value'] === null) {
        item['value'] = "null"
      }
      return item
    })
  }

  if (eventMode.value == "emit-event"){
    eventSignal.value = model.value['onChange'].eventSignal
  }
})

</script>


<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>

<i18n lang="json">
{
  "en": {
    "eventType": "Event type",
    "events": "Events",
    "onChangeLabel": "On value change",
    "mode": "Mode",
    "changeModelLabel": "Model change",
    "emitEventLabel": "Emit event",
    "eventSignal": "Signal",
    "actionLabel": "Action",
    "actionCode": "Action code",
    "scriptCode": "Script code",
    "paramsLabel": "Action/Request params",
    "params": {
      "title": "Name",
      "value": "Value"
    },
    "bodyAttributesLabel": "Action/Request body",
    "bodyAttributes": {
      "title": "Name",
      "value": "Value"
    }
  },
  "pl": {
    "eventType": "Rodzaj zdarzenia",
    "events": "Zdarzenia",
    "onChangeLabel": "Zmiana wartości",
    "mode": "Tryb pracy",
    "changeModelLabel": "Zmiana wartości modelu",
    "emitEventLabel": "Emituj zdarzenie",
    "eventSignal": "Sygnał",
    "actionLabel": "Akcja",
    "actionCode": "Kod akcji",
    "scriptCode": "Kod skryptu (db => code)",
    "paramsLabel": "Parametry akcji/żądania HTTP",
    "params": {
      "title": "Nazwa",
      "value": "Wartość"
    },
    "bodyAttributesLabel": "Body akcji/żądania HTTP",
    "bodyAttributes": {
      "title": "Name",
      "value": "Value"
    }
  }
}
</i18n>
