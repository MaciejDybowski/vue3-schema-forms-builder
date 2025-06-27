<template>
  <v-btn
    :value="value"
    class="px-0"
    height="25"
    max-width="25"
    min-width="25"
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
