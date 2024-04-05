import "@vue/runtime-core";
import FormBuilder from "@/components/FormBuilder.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    FormBuilder: typeof FormBuilder
  }
}
