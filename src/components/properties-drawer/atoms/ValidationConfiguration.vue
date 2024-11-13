<template>
  <v-list-item class="px-0 pa-0">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-divider class="pa-0 ma-0"/>
        <v-expansion-panel-title>
          <div>{{ t('validations') }}</div>
        </v-expansion-panel-title>
        <v-divider class="pa-0 ma-0"/>
        <v-expansion-panel-text class="px-0 pa-0">
          <switch-general
            v-model="requiredType"
            :label="requiredType ? t('requiredTypeCondition') : t('requiredTypeSimple')"
            @update:model-value="mapSimpleRequired"
          />

          <checkbox-general
            v-if="!requiredType"
            v-model="model.required"
            :label="t('requiredProperty')"
          />
          <textfield-general
            v-if="requiredType"
            :label="t('requiredProperty')"
            v-model="requiredCondition"
            @update:model-value="mapRequiredCustomFunction"
          />

          <number-general
            v-model="model.layout.props['counter']"
            :label="t('counter')"
          />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-list-item>

</template>


<script lang="ts" setup>

import {useI18n} from "vue-i18n";
import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {useStyle} from "@/main";

import SwitchGeneral from "@/components/properties-drawer/atoms/SwitchGeneral.vue";
import CheckboxGeneral from "@/components/properties-drawer/atoms/CheckboxGeneral.vue";
import NumberGeneral from "@/components/properties-drawer/atoms/NumberGeneral.vue";

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

const requiredType = ref(false)
const requiredCondition = ref(null)

function mapSimpleRequired(value: boolean){
  if(value){
    // condition mode
    requiredCondition.value = null
    model.value.required = false;
  } else {
    model.value.validations = model.value.validations?.filter((item:any) => item.name !== "conditional-required")
  }
}

function mapRequiredCustomFunction(value: string){
  if(model.value.validations && model.value.validations.length > 0){
    const ruleDefinition = model.value.validations.find((item: any) => item.name == "conditional-required")
    ruleDefinition.rule = value
  } else {
    model.value.validations = []
    model.value.validations.push({
      name: "conditional-required",
      rule: value
    })
  }
}

onMounted(() => {
  if(model.value.validations){
    model.value.validations.forEach((item: any) => {
      if(item.name === "conditional-required"){
        requiredType.value = true
        requiredCondition.value = item.rule
      }
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
