<template>
  <v-row class="flex-column" no-gutters>
    <v-spacer></v-spacer>
    <v-col cols="auto">
      <v-btn
        size="30"
        @click="
          drawers.propertiesDrawer.value = !drawers.propertiesDrawer.value
        "
      >
        <v-icon size="small">{{
            drawers.propertiesDrawer.value
              ? "mdi-arrow-collapse-right"
              : "mdi-arrow-collapse-left"
          }}
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import {useDrawers} from "../../composables/useDrawers";

const drawers = useDrawers();
</script>

<style lang="scss" scoped></style>
<i18n lang="json">
{
  "en": {},
  "pl": {}
}
</i18n>
