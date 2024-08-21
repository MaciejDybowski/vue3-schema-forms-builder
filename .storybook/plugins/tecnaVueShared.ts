import {createTecnaVue} from "../../../vue3-shared"
import "../../../vue3-shared/dist/style.css"
// import {createTecnaVue} from "tecna-vue-shared"
// import "tecna-vue-shared/dist/style.css"
import {useStyleDefault} from "../../src/composables/useStyleDefault";
import {avatar} from "../store/avatar";


const plugin = createTecnaVue({
  useStyle: useStyleDefault as any,
  useAvatar: avatar,
})


export default plugin
