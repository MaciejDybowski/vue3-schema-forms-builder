import {App} from "vue";
import components from "./components/index";
import {useBuilderState} from "@/pinia/stores/useBuilderState";

export type SchemaFormBuilder = {
  install: (app: App) => void;
};

export type VueSchemaFormBuilderOptions = {
  themesNames: ThemesNames
}

export type ThemesNames = {
  light: string,
  dark: string
}

export let themesNames: ThemesNames = {
  dark: "dark",
  light: "light"
}

export const builderState = useBuilderState
export const createVueSchemaFromBuilder = (options?: VueSchemaFormBuilderOptions): SchemaFormBuilder => {
  if (options?.themesNames) {
    themesNames = options.themesNames
  }
  return {
    install(Vue: App) {
      for (const key in components) {
        Vue.component(key, components[key]);
      }
    },
  };
}
