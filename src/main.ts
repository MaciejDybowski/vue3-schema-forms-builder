import {App} from "vue";
import components from "./components/index";
import {useBuilderState} from "@/pinia/stores/useBuilderState";

export type SchemaFormBuilder = {
  install: (app: App) => void;
};

export const builderState = useBuilderState
export const createVueSchemaFromBuilder = (options?: any): SchemaFormBuilder => {
  return {
    install(Vue: App) {

      for (const key in components) {
        Vue.component(key, components[key]);
      }
    },
  };
}
