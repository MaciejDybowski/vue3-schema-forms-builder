<template>
  <div class="col-property">
    <p class="v-label">{{label}}</p>
    <v-btn-toggle
      class="mt-1"
      v-model="larger"
      @update:model-value="updateSmaller"
      mandatory
      density="compact"
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
</template>

<script setup lang="ts">
import ColBtn from "@/components/properties-drawer/atoms/ColBtn.vue";

const props = defineProps<{
  label: string
}>()
const larger = defineModel<number>('breakpointLarger')
const smaller = defineModel<number>("breakpointSmaller")

function updateSmaller(val: number){
  smaller.value = val
}
</script>



<style scoped lang="scss">

</style>
