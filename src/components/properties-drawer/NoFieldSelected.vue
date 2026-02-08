<template>
  <div class="flex flex-col items-center justify-center text-center text-gray-600 py-10">
    <svg
      class="w-48 h-32 mb-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Okno -->
      <rect height="120" rx="8" ry="8" stroke-width="2" width="240" x="30" y="40"/>
      <line x1="30" x2="270" y1="65" y2="65"/>
      <!-- Kropki -->
      <circle cx="45" cy="53" r="3"/>
      <circle cx="58" cy="53" r="3"/>
      <circle cx="71" cy="53" r="3"/>
      <!-- Obszar zaznaczenia -->
      <rect
        height="50"
        rx="6"
        ry="6"
        stroke-dasharray="6 6"
        width="120"
        x="90"
        y="90"
      />
    </svg>

    <p class="text-lg font-medium">{{ t('noFieldSelected') }}</p>
  </div>
</template>

<script lang="ts" setup>
import {useBuilderLocale} from "@/composables/useBuilderLocale";

const {t} = useBuilderLocale()
</script>

<style scoped>
svg rect[stroke-dasharray] {
  animation: dash 3s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -12;
  }
}
</style>
