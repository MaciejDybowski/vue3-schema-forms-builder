<template>
  <v-list-item>
    <v-checkbox
      v-model="modelValue"
      :label="t('multipleProperty')"
      class="mx-2"
      hide-details="auto"
      v-bind="style.inputStyle.value"
    />
  </v-list-item>
</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";
import {onMounted} from "vue";

const modelValue = defineModel()
const style = useStyle()

const {t} = useI18n({ useScope: 'global' })

onMounted(() => {
  if (!modelValue.value) {
    modelValue.value = false
  }
})

</script>

<style lang="scss" scoped>
</style>
