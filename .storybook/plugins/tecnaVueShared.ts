/*import {createTecnaVue} from "../../../vue3-shared"
import "../../../vue3-shared/dist/style.css"*/
import {createTecnaCodeEditor, createTecnaVue} from "tecna-vue-shared"
import "tecna-vue-shared/dist/style.css"
import {useStyleDefault} from "../../src/composables/useStyleDefault";

const plugin = createTecnaVue({
  useStyle: useStyleDefault as any,
})
export const tecnaCodeEditor = createTecnaCodeEditor()

export default plugin
