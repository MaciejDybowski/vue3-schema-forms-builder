import {App, ComputedRef} from "vue";
import components from "./components/index";
import {useBuilderState} from "./pinia/useBuilderState";
import {useStyleDefault} from "@/composables/useStyleDefault";

export let useStyle = () => useStyleDefault() as unknown as UseStyleComposable;

export type SchemaFormBuilder = {
  install: (app: App) => void;
};

export type VueSchemaFormBuilderOptions = {
  themesNames: ThemesNames,
  useStyle?: () => UseStyleComposable
}

export const builderState = useBuilderState
export const createVueSchemaFromBuilder = (options?: VueSchemaFormBuilderOptions): SchemaFormBuilder => {
  if (options?.themesNames) {
    themesNames = options.themesNames
  }
  if (options?.useStyle) {
    useStyle = options.useStyle;
  }
  return {
    install(Vue: App) {
      for (const key in components) {
        Vue.component(key, components[key]);
      }
    },
  };
}


export type ThemesNames = {
  light: string,
  dark: string
}

export let themesNames: ThemesNames = {
  dark: "dark",
  light: "light"
}

export type UseStyleComposable = {
  buttonStyle: ComputedRef<any>;
  inputStyle: ComputedRef<any>;
  primaryWhite: ComputedRef<"white" | "primary">;
};
