import {DraggableFormElement} from "@/models/DraggableFormElement";
import {Ref, ref} from "vue";
import {FormSchema} from "@/models/FormSchema";
import {SchemaFormElement} from "@/models/SchemaFormElement";

export function useDraggableMapper() {



  function mapSchemaToDraggable(formSchema: FormSchema): Array<DraggableFormElement> {
    const draggableElements: Ref<DraggableFormElement[]> = ref([])

    Object.entries(formSchema.properties).forEach(([key, schemaElement]: [string, SchemaFormElement]) => {
      mapSingleElement(formSchema, draggableElements, key, schemaElement)
    })

    return draggableElements.value
  }

  function mapSingleElement(formSchema: FormSchema, draggableElements:Ref<DraggableFormElement[]>,  key: string, schemaElement: SchemaFormElement) {

    // TEMPORARY for all existed schema will be transformed
    if (!schemaElement.layout.props) {
      schemaElement.layout.props = {}
    }

    if (schemaElement.layout.schema) {
      schemaElement.layout.schema.options = formSchema.options
      schemaElement.tempItems = mapSchemaToDraggable(schemaElement.layout.schema)
    }

    draggableElements.value.push(
      {
        formId: 'builder-tecna-id',
        key: key,
        ...schemaElement as object,
        "on": {
          "input": (e) => {
          }
        },
        options: formSchema.options,
        required: formSchema.required?.includes(key),
      }
    )
  }

  return {mapSchemaToDraggable}
}
