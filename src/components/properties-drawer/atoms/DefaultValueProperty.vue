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

const {t} = useI18n({ useScope: 'global' })
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
