<template>
  <v-btn
    min-width="22.2"
    max-width="22.2"
    height="22.5"
    class="px-0"
    :value="value"
    variant="outlined"
  >
    <span class="col-val-btn">{{ value }}</span>
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: any
}>()

</script>


<style scoped lang="scss">
.col-val-btn {
  font-size: 0.75rem;
}
</style>
