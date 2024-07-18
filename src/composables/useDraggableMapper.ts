import {DraggableFormElement} from "@/models/DraggableFormElement";
import {Ref, ref} from "vue";
import {FormSchema} from "@/models/FormSchema";
import {SchemaFormElement} from "@/models/SchemaFormElement";
import {FormOptions} from "@/models/FormOptions";

export function useDraggableMapper() {



  function mapSchemaToDraggable(formSchema: FormSchema, formOptions: FormOptions): Array<DraggableFormElement> {
    const draggableElements: Ref<DraggableFormElement[]> = ref([])

    Object.entries(formSchema.properties).forEach(([key, schemaElement]: [string, SchemaFormElement]) => {
      mapSingleElement(formSchema, formOptions, draggableElements, key, schemaElement)
    })

    return draggableElements.value
  }

  function mapSingleElement(formSchema: FormSchema, formOptions: FormOptions, draggableElements:Ref<DraggableFormElement[]>,  key: string, schemaElement: SchemaFormElement) {

    // TEMPORARY for all existed schema will be transformed
    if (!schemaElement.layout.props) {
      schemaElement.layout.props = {}
    }

    if (schemaElement.layout.schema) {
      schemaElement.layout.schema.options = formOptions
      schemaElement.tempItems = mapSchemaToDraggable(schemaElement.layout.schema, formOptions)
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
        options: formOptions,
        required: formSchema.required?.includes(key),
      }
    )
  }

  return {mapSchemaToDraggable}
}
