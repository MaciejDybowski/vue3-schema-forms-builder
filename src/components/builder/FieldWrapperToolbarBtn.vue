<template>
  <v-btn
    rounded="0"
    color="primary"
    variant="outlined"
    density="compact"
    height="20px"
    size="20px"
    @click="emit('click')"
    v-on="attrs"
  >
    <v-icon size="17">{{ props.icon }}</v-icon>
  </v-btn>

</template>


<script setup lang="ts">
import {useAttrs} from "vue";

const props = defineProps<{
  icon: string
}>()

const attrs = useAttrs()

const emit = defineEmits<{
  (e: "click"): void;
}>();

</script>


<style scoped lang="scss">

</style>
