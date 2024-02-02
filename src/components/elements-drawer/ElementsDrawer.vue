<template>
  <v-navigation-drawer
    v-model="drawers.elementsDrawer.value"
    width="300"
    permament
    order="3"
    scrim="transparent"
  >
  TODO
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDrawers } from "@/composables/useDrawers";

const drawers = useDrawers();
</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
