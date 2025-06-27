<template>
  <v-app>
    <v-main>
      <slot name="story"></slot>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import {useTheme} from "vuetify";
import {onMounted, watch} from "vue";
import i18n from "../plugins/i18n";
import {themesNames} from "@/main";

const props = defineProps<{
  themeName: any;
  localeName: any;
}>();

const theme = useTheme();

watch(props.localeName, (nVal) => {
  i18n.global.locale.value = nVal;
});

watch(props.themeName, (nVal) => {
  theme.global.name.value = nVal as string;
});

onMounted(() => {
  i18n.global.locale.value = props.localeName.value;
});

const initThemesNames = themesNames
</script>

<style>
.v-application__wrap {
  min-height: 0vh !important;
}
</style>
