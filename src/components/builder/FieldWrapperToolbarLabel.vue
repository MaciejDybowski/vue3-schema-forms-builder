<template>
  <div class="key-field px-2"
       :style="btnColor"
  >
    {{ elementKey }}
  </div>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {useVTheme} from "@/composables/useVTheme";

const theme = useVTheme()

const props = defineProps<{
  elementKey: string
}>()

const btnColor = computed(() => {
  if (theme.isLightTheme.value) {
    return "background-color: rgb(var(--v-theme-primary))"
  } else {
    return "background-color: #777777"
  }
})


</script>

<style scoped lang="scss">
.key-field {
  position: absolute;
  top: -1.25rem;
  left: -0.05rem;
  font-size: 0.8rem;
  color: white;
  height: 20px;
  //background-color: rgb(var(--v-theme-primary));
  background-color: #777777
}
</style>
