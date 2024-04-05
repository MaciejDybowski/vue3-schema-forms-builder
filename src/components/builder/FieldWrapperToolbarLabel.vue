<template>
  <div class="key-field px-2">
    {{ elementKey }}
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  elementKey: string
}>()

</script>

<style scoped lang="scss">
.key-field {
  position: absolute;
  top: -1.25rem;
  left: -0.05rem;
  font-size: 0.8rem;
  color: white;
  height: 20px;
  background-color: rgb(var(--v-theme-primary));
}
</style>
