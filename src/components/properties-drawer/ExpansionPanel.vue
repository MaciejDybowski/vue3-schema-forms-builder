<template>
  <v-expansion-panel
    :value="value"
    class="tcn-expansion-panel"
  >
    <div v-show="active" class="panel-divider"/>
    <v-expansion-panel-title
      collapse-icon="mdi-minus"
      expand-icon="mdi-plus"
    >
      {{ title }}
    </v-expansion-panel-title>

    <v-divider v-show="active"/>

    <v-expansion-panel-text class="mb-2">
      <slot/>
    </v-expansion-panel-text>

    <v-divider v-show="active"/>
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

:deep(.tcn-expansion-panel hr) {
  display: none;
}

.v-expansion-panel--active:not(:first-child),
.v-expansion-panel--active + .v-expansion-panel {
  margin-top: 0;
}

.v-expansion-panel--active > .v-expansion-panel-title:not(.v-expansion-panel-title--static) {
  min-height: 48px;
}

.v-expansion-panel {
  border-radius: 0;
  position: relative;
}

.panel-divider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: rgba(var(--v-theme-on-surface), 0.12);
  pointer-events: none;
}
</style>
