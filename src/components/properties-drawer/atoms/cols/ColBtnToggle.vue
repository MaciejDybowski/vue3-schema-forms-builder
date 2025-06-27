<template>
  <div class="col-property">
    <p class="v-label">{{ label }}</p>
    <v-btn-toggle
      v-model="larger"
      class="mt-1"
      density="compact"
      mandatory
      @update:model-value="updateSmaller"
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

<script lang="ts" setup>
import ColBtn from "@/components/properties-drawer/atoms/cols/ColBtn.vue";

const props = defineProps<{
  label: string
}>()
const larger = defineModel<number>('breakpointLarger')
const smaller = defineModel<number>("breakpointSmaller")
const smallest = defineModel<number>("breakpointSmallest")

function updateSmaller(val: number) {
  smaller.value = val
  smallest.value = val
}
</script>


<style lang="scss" scoped>

</style>
