import {DraggableFormElement} from "@/models/DraggableFormElement";
import {Ref, ref} from "vue";
import {FormSchema} from "@/models/FormSchema";
import {SchemaFormElement} from "@/models/SchemaFormElement";
import {FormOptions} from "@/models/FormOptions";
import {isNumber} from "lodash";

export function useDraggableMapper() {


  function mapSchemaToDraggable(formSchema: FormSchema, formOptions: FormOptions): Array<DraggableFormElement> {
    const draggableElements: Ref<DraggableFormElement[]> = ref([])

    Object.entries(formSchema.properties).forEach(([key, schemaElement]: [string, SchemaFormElement]) => {

      if (isNestedFields(schemaElement)) {
        const mappedFields = [...mapSchemaToDraggable(schemaElement as FormSchema, formOptions)]
          .map(item => {
            item.key = `${key}.${item.key}`
            return item
          })
        draggableElements.value.push(...mappedFields)

      } else {
        mapSingleElement(formSchema, formOptions, draggableElements, key, schemaElement)
      }

    })

    return draggableElements.value
  }

  function mapSingleElement(formSchema: FormSchema, formOptions: FormOptions, draggableElements: Ref<DraggableFormElement[]>, key: string, schemaElement: SchemaFormElement) {

    // TEMPORARY for all existed schema will be transformed
    if (!schemaElement.layout.props) {
      schemaElement.layout.props = {}
    }
    if (schemaElement.layout.schema && !schemaElement.layout.options) {
      schemaElement.layout.options = {
        showDivider: false,
        addBtnText: "Add"
      }
    }
    if (isNumber(schemaElement.layout.cols)) {
      schemaElement.layout.cols = {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: schemaElement.layout.cols,
        xxl: schemaElement.layout.cols,
      }
    }
    // END TEMPORARY MAPPINGS

    if (schemaElement.layout.schema) {
      schemaElement.layout.schema.options = formOptions
      schemaElement.tempItems = mapSchemaToDraggable(schemaElement.layout.schema, formOptions)
    }

    const draggableElement = {
      formId: 'builder-tecna-id',
      key: key,
      ...schemaElement as object,
      "on": {
        "input": (e) => {
        }
      },
      options: formOptions,
      required: formSchema.required?.includes(key) as boolean,
    } as DraggableFormElement

    dictionarySourceBuilderMapping(draggableElement)


    draggableElements.value.push(draggableElement)
  }

  function dictionarySourceBuilderMapping(draggableElement: DraggableFormElement) {
    if (draggableElement.layout.component == 'dictionary' || draggableElement.layout.component == 'user-input') {
      const copy = draggableElement.source.url
      draggableElement.source.url = ""
      draggableElement.source.builder_url = copy
    }
  }

  function isNestedFields(schemaElement: SchemaFormElement) {
    return "properties" in schemaElement;
  }

  return {mapSchemaToDraggable}
}
