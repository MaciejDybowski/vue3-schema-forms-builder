import {App} from "vue";
import components from "@/components/index";

export type TecnaVue = {
  install: (app: App) => void;
};
export const createVueSchemaFromBuilder = (options?: any): TecnaVue => {
  return {
    install(Vue: App) {
      for (const key in components) {
        Vue.component(key, components[key]);
      }
    },
  };
}
