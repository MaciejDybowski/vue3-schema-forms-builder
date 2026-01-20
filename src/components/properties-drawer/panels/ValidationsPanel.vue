<template>
  <expansion-panel
    :active="active"
    :title="t('validations.title')"
    value="validations"
  >
    <slot name="beforeRequired">

    </slot>
    <boolean-checkbox-property-wrapper
      v-model="model.required"
      :label="t('validations.requiredProperty')"
    />

    <number-property-wrapper
      v-if="showCounter"
      v-model="model.layout.props['counter']"
      :label="t('validations.counter')"
    />

    <v-divider
      :thickness="2"
      class="mx-4 my-2"
      color="primary"
      opacity="50"
    ></v-divider>

    <span class="v-card-subtitle px-4">
      {{ t('validations.customFunctions') }}
    </span>

    <div v-for="(rule, key) in validations" :key="key" class="px-0">
      <v-list-item>
        <v-combobox
          v-model="rule.name"
          :items="availableValidations"
          :label="t('validations.name')"
          v-bind="style.inputStyle.value"
        />
      </v-list-item>

      <text-property-wrapper
        v-model="rule.rule"
        :label="t('validations.function')"
      />

      <text-property-wrapper
        v-model="rule.message"
        :label="t('validations.message')"
      />

      <v-btn
        :text="t('validations.remove')"
        class="mx-4 mb-2"
        color="error"
        density="compact"
        @click="removeValidation(key)"
      />
    </div>

    <v-btn
      :text="t('validations.add')"
      class="mx-4 mt-2"
      color="primary"
      density="compact"
      @click="addValidation"
    />
  </expansion-panel>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {computed, onMounted, ref, watch} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import {useStyle} from "@/main";

import ExpansionPanel from "@/components/properties-drawer/ExpansionPanel.vue";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";
import BooleanCheckboxPropertyWrapper from "@/components/properties-drawer/atoms/BooleanCheckboxPropertyWrapper.vue";
import NumberPropertyWrapper from "@/components/properties-drawer/atoms/NumberPropertyWrapper.vue";

const {t} = useI18n();
const style = useStyle();

const props = withDefaults(defineProps<{
  active: boolean
  showCounter?: boolean
}>(), {
  active: false,
  showCounter: false,
})

const useBuilderStateStore = useBuilderState();
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField;
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val);
  },
});

interface SchemaSimpleValidation {
  name: string | null;
  rule?: string | null;
  regexp?: RegExp;
  message?: string | null;
  nullable?: boolean;
}

const validations = ref<Array<SchemaSimpleValidation>>([]);

const availableValidations = [
  "conditional-required",
  "min-length",
  "max-length",
  "pattern",
];

watch(
  validations,
  () => {
    model.value.validations = validations.value;
  },
  {deep: true}
);

onMounted(() => {
  if (model.value.validations) {
    validations.value = [...model.value.validations];
  }
});

function addValidation() {
  validations.value.push({
    name: null,
    rule: null,
    message: null,
  });
}

function removeValidation(index: number) {
  validations.value = validations.value.filter((_, i) => i !== index);
}
</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 8px 2px;
}
</style>

<i18n lang="json">
{
  "en": {
    "validations": {
      "title": "Validations",
      "requiredProperty": "Required field",
      "counter": "Character counter",
      "customFunctions": "Custom validation functions",
      "name": "Validation name",
      "function": "Validation function (JSONata)",
      "message": "Validation message",
      "add": "Add validation",
      "remove": "Remove validation"
    }
  },
  "pl": {
    "validations": {
      "title": "Walidacje",
      "requiredProperty": "Pole wymagane",
      "counter": "Licznik znaków",
      "customFunctions": "Funkcje walidacyjne",
      "name": "Nazwa walidacji",
      "function": "Funkcja walidacyjna (JSONata)",
      "message": "Komunikat walidacyjny",
      "add": "Dodaj walidację",
      "remove": "Usuń walidację"
    }
  }
}
</i18n>
