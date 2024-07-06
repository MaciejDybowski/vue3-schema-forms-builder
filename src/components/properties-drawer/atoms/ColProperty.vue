<template>
  <v-list-item>
    <div class="col-property">
      <p class="v-label">{{ t('size') }}</p>
      <v-btn-toggle
        class="mt-1"
        v-model="modelValue"
        mandatory
      >
        <col-btn :value="1"></col-btn>
        <col-btn :value="2"></col-btn>
        <col-btn :value="3"></col-btn>
        <col-btn :value="4"></col-btn>
        <col-btn :value="5"></col-btn>
        <col-btn :value="6"></col-btn>
        <col-btn :value="7"></col-btn>
        <col-btn :value="8"></col-btn>
        <col-btn :value="9"></col-btn>
        <col-btn :value="10"></col-btn>
        <col-btn :value="11"></col-btn>
        <col-btn :value="12"></col-btn>
      </v-btn-toggle>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
import ColBtn from "../../properties-drawer/atoms/ColBtn.vue";
import {useI18n} from "vue-i18n";

const modelValue = defineModel()
const {t} = useI18n()
</script>

<style scoped lang="scss">

</style>

<i18n lang="json">
{
  "en": {
    "size": "Size"
  },
  "pl": {
    "size": "Szerokość pola"
  }
}
</i18n>
