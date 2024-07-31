<template>
  <v-btn
    :value="value"
    class="px-0"
    height="26.5"
    max-width="26.2"
    min-width="26.2"
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
