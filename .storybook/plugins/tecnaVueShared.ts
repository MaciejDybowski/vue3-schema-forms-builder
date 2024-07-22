import {createTecnaVue} from "tecna-vue-shared"
import "tecna-vue-shared/dist/style.css"
import {useStyleDefault} from "../../src/composables/useStyleDefault";


const plugin = createTecnaVue({
  useStyle: useStyleDefault as any
})


export default plugin
