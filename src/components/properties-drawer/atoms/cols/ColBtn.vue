<template>
  <v-btn
    :value="value"
    class="px-0"
    height="28"
    max-width="28"
    min-width="28"
    variant="outlined"
  >
    <span class="col-val-btn">{{ value }}</span>
  </v-btn>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: any
}>()

</script>


<style lang="scss" scoped>
.col-val-btn {
  font-size: 0.75rem;
}
</style>
