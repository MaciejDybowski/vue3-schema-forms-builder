<template>
  <v-btn
    :color="btnColor"
    class="toolbar-btn"
    density="compact"
    height="20px"
    rounded="0"
    size="20px"
    variant="outlined"
    @click="emit('click')"
  >
    <v-icon size="17">{{ props.icon }}</v-icon>
  </v-btn>

</template>


<script lang="ts" setup>
import {computed, useAttrs} from "vue";
import {useVTheme} from "@/composables/useVTheme";


const props = defineProps<{
  icon: string
}>()

const attrs = useAttrs()
const theme = useVTheme()

const emit = defineEmits<{
  (e: "click"): void;
}>();

const btnColor = computed(() => {
  if (theme.isLightTheme.value) {
    return "primary"
  } else {
    return "#a5a5a5"
  }
})

</script>


<style lang="scss" scoped>
.toolbar-btn {
  border-radius: 4px 4px 0 0 !important;
}
</style>
