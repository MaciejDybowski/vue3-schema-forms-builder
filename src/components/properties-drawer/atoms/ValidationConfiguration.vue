<template>
  <expansion-panel
    :active="active"
    :title="t('validations')"
    value="validations"
  >
    <checkbox-general
      v-model="model.required"
      :label="t('requiredProperty')"
    />

    <slot name="afterRequired">

    </slot>

    <v-divider
      :thickness="2"
      class="mx-4 my-2"
      color="primary"
      opacity="50"
    ></v-divider>
    <span class="v-card-subtitle">Funkcje walidacyjne</span>
    <div v-for="(rule, key) in validations">

      <v-list-item>
        <v-combobox
          v-model="rule.name"
          :items="['conditional-required']"
          class="pt-2"
          label="Nazwa"
          v-bind="style.inputStyle.value"
        />
      </v-list-item>
      <textfield-general
        v-model="rule.rule"
        label="Funkcja JSONata"
      />

      <textfield-general
        v-model="rule.message"
        label="Komunikat"
      />

      <v-btn
        class="mx-4 mb-2"
        color="error"
        density="compact"
        text="Usuń"
        @click="validations = validations.filter((v, i) => i !== key)"
      >
      </v-btn>
    </div>

    <v-btn
      class="mx-4"
      color="primary"
      density="compact"
      text="Dodaj"
      @click="validations.push({name: null, rule: null, message:null})"
    >
    </v-btn>
  </expansion-panel>
</template>


<script lang="ts" setup>

import {useI18n} from "vue-i18n";
import {computed, onMounted, ref, watch} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {useStyle} from "@/main";
import CheckboxGeneral from "@/components/properties-drawer/atoms/CheckboxGeneral.vue";
import NumberGeneral from "@/components/properties-drawer/atoms/NumberGeneral.vue";
import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";

const {t} = useI18n()
const style = useStyle()

const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})
const props = defineProps<{
  active: boolean
}>()

interface SchemaSimpleValidation {
  name: string | null,
  rule?: string | null
  regexp?: RegExp;
  message?: string | null;
  nullable?: boolean;
}

const validations = ref<Array<SchemaSimpleValidation>>([])

watch(validations, (newVal, oldValue) => {
  model.value.validations = validations.value
}, {deep: true})

onMounted(() => {
  if (model.value.validations) {
    model.value.validations.forEach((item: any) => {
      validations.value.push(item)
    })
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
    "requiredTypeSimple": "Required: yes/no",
    "requiredTypeCondition": "Required: condition",
    "validations": "Validations",
    "counter": "Counter of letters",
    "requiredProperty": "Required"
  },
  "pl": {
    "requiredTypeSimple": "Wymagalonść: tak/nie",
    "requiredTypeCondition": "Wymagalność: warunek",
    "validations": "Walidacje",
    "counter": "Licznik liter",
    "requiredProperty": "Pole wymagane"
  }
}
</i18n>
