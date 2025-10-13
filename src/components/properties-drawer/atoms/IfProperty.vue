<template>
  <v-label
    class="text-subtitle-2  text-wrap mx-4 pb-2">{{ t('ifProperty') }}
  </v-label>
  <tcn-code-editor
    v-model="modelValue"
    :codemirrorOptions="{
          lineNumbers: 'off',
          minimap: {
            enabled: false
          }
        }"
    height="80px"
    language="text"
  />

</template>

<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useStyle} from "@/main";


const modelValue = defineModel()
const style = useStyle()

const {t} = useI18n()
</script>

<style lang="scss" scoped>
</style>

<i18n lang="json">
{
  "en": {
    "ifProperty": "Conditional rendering"
  },
  "pl": {
    "ifProperty": "Warunek widoczności"
  }
}
</i18n>
