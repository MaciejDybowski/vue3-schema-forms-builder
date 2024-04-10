<template>
  <v-btn
    rounded="0"
    :color="btnColor"
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
import {computed, useAttrs} from "vue";
import {useTheme} from "vuetify";


const props = defineProps<{
  icon: string
}>()

const attrs = useAttrs()
const vTheme = useTheme()

const emit = defineEmits<{
  (e: "click"): void;
}>();

const btnColor = computed(() => {
  if(vTheme.name.value === "AureaModelerLight") {
    return "primary"
  } else {
    return "#a5a5a5"
  }
})

</script>


<style scoped lang="scss">

</style>
