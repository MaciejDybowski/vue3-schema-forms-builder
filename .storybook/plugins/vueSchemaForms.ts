// import {createVueSchemaForms} from "vue3-schema-forms";
// import "vue3-schema-forms/dist/style.css"

import {createVueSchemaForms} from "../../../vue3-schema-forms";
import "../../../vue3-schema-forms/dist/style.css"

const vueSchemaForms = createVueSchemaForms({
  formUpdateLogger: true,
  installFormControls: true
})
export default vueSchemaForms
