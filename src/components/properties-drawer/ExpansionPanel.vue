<template>
  <v-expansion-panel
    :value="value"
  >
    <v-expansion-panel-title
      collapse-icon="mdi-minus"
      expand-icon="mdi-plus">
      {{ title }}
    </v-expansion-panel-title>
    <v-divider v-if="active"/>
    <v-expansion-panel-text class="mb-2">
      <slot name="default">
      </slot>
    </v-expansion-panel-text>
    <v-divider v-if="active"/>
  </v-expansion-panel>
</template>

<script lang="ts" setup>

const props = defineProps<{
  title: string,
  value: string,
  active: boolean
}>()
</script>

<style lang="scss" scoped>
:deep(.v-expansion-panel-text__wrapper) {
  padding: 0 0;
}

.v-expansion-panel--active:not(:first-child), .v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0;
}

.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 48px;
}

.v-expansion-panel {
  border-radius: 0;
}
</style>
