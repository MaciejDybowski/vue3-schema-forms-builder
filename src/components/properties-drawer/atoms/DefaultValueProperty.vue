<template>
  <text-property-wrapper
    :label="t('defaultValue')"
    :model-value="defaultValueModel"
    @update:model-value="mapDefaultValue"
  >
    <template #append-inner>
      <div class="append-inner-column">
        <v-tooltip
          location="left"
          width="280"
        >
          <template #activator="{ props }">
            <v-icon v-bind="props">
              mdi-information-outline
            </v-icon>
          </template>
          <span>{{ t('defaultValueInfo') }}</span>
        </v-tooltip>


      </div>
    </template>
  </text-property-wrapper>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/useBuilderState";
import {useI18n} from "vue-i18n";
import TextPropertyWrapper from "@/components/properties-drawer/atoms/TextPropertyWrapper.vue";

const {t} = useI18n()
const useBuilderStateStore = useBuilderState()
const model = computed({
  get() {
    return useBuilderStateStore.getConfiguredField
  },
  set(val) {
    useBuilderStateStore.setConfiguredField(val)
  }
})

const defaultValueModel = ref<string | number | null>(null)
onMounted(() => {
  if (model.value.defaultValue) {
    try {
      defaultValueModel.value = JSON.stringify(model.value.defaultValue)
    } catch (e) {
      defaultValueModel.value = model.value.defaultValue
    }
  }
})

function mapDefaultValue(val: string) {
  if (val == "") {
    model.value['defaultValue'] = null
    defaultValueModel.value = val
    return
  }
  try {
    model.value['defaultValue'] = JSON.parse(val);
    defaultValueModel.value = val
  } catch (e) {
    try {
      // @ts-ignore
      const number = Number(val)
      model.value['defaultValue'] = number
      defaultValueModel.value = val

    } catch (e) {
      model.value['defaultValue'] = val
      defaultValueModel.value = val
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

<i18n lang="json">
{
  "pl": {
    "defaultValue": "Wartość domyślna pola",
    "defaultValueInfo": "Wartość domyślna pola, która zostanie ustawiona, gdy użytkownik nie wprowadzi żadnej wartości. Wartości tekstowe należy podać w cudzysłowie, np. 'tekst'. Wartości liczbowe podajemy bez cudzysłowów, np. 123.Wartości złożone, takie jak obiekty lub tablice, należy podać w formacie JSON"
  },
  "en": {
    "defaultValue": "Default value of the field",
    "defaultValueInfo": "The default value of the field that will be set when the user does not enter any value. Text values should be provided in quotes, e.g. 'text'. Numeric values should be provided without quotes, e.g. 123. Complex values such as objects or arrays should be provided in JSON format"
  }
}
</i18n>
