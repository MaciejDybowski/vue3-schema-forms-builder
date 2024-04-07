import "@vue/runtime-core";
import VueSchemaFormsBuilder from "@/components/VueSchemaFormsBuilder.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    VueSchemaFormsBuilder: typeof VueSchemaFormsBuilder
  }
}
