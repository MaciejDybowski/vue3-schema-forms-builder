<template>
  <v-divider class="mt-2"/>
  <textfield-general
    :label="t('defaultValue')"
    :model-value="defaultValueModel"
    @update:model-value="mapDefaultValue"
  />
</template>

<script lang="ts" se tup>
import TextfieldGeneral from "@/components/properties-drawer/atoms/TextfieldGeneral.vue";
import {computed, onMounted, ref} from "vue";
import {useBuilderState} from "@/pinia/stores/useBuilderState";
import {useI18n} from "vue-i18n";

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
  if(val == ""){
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
    "defaultValue": "Wartość domyślna pola"
  },
  "en": {
    "defaultValue": "Default value of field"
  }
}
</i18n>
