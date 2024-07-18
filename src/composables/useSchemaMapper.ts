import {DraggableFormElement} from "@/models/DraggableFormElement";
import {Ref, ref} from "vue";

import {FormSchema} from "@/models/FormSchema";
import {cloneDeep} from "lodash";
import {useStyle} from "@/main";


export function useSchemaMapper() {
  const style = useStyle();

  const schema: Ref<FormSchema> = ref({
    type: "object",
    properties: {},
    options: {
      fieldProps: style.inputStyle
    },
    required: []
  })

  function mapDraggableToSchema(formElements: DraggableFormElement[]): FormSchema {
    schema.value.properties = {}

    formElements.forEach((element: DraggableFormElement) => {
      mapSingleElement(schema.value, element)
    })

    delete schema.value.options
    return schema.value
  }

  function mapSingleElement(schema: FormSchema, formElement: DraggableFormElement) {
    if (elementIsDuplicatedSection(formElement)) {
      mapDuplicatedSectionToSchema(schema, formElement)
    } else {
      mapOthersElements(schema, formElement);
    }
  }

  function elementHasNestedKey(formElement: DraggableFormElement) {
    return formElement.key.includes(".")
  }

  function elementIsDuplicatedSection(formElement: DraggableFormElement) {
    return Array.isArray(formElement.tempItems);
  }

  function mapDuplicatedSectionToSchema(schema: FormSchema, formElement: DraggableFormElement) {
    const tempElement = cloneDeep(formElement)
    const tempElementKey = tempElement.key
    tempElement.layout.schema.properties = {}
    tempElement.tempItems.forEach(element => {
      mapSingleElement(tempElement.layout.schema, element)
    })
    removeDraggableFields(tempElement)
    schema.properties[tempElementKey] = tempElement
  }

  function removeDraggableFields(formElement: Partial<DraggableFormElement>) {
    delete formElement.formId
    delete formElement.key
    delete formElement.on
    delete formElement.options

    if (formElement.tempItems) {
      delete formElement.tempItems
      delete formElement.required
      delete formElement.layout.schema.options
    }

    delete formElement.required
  }

  function mapOthersElements(schema: FormSchema, formElement: DraggableFormElement) {
    if (elementHasNestedKey(formElement)) {
      // basicData.firstName
      const keys = formElement.key.split(".")
      const nestedRootKey = keys[0]
      // if nested root not exist yet then create
      if (schema.properties[nestedRootKey] === undefined) {
        schema.properties[nestedRootKey] = {properties: {}}
      }
      const tempElement = {...formElement}
      keys.shift()
      tempElement.key = keys.join(".")
      // call function for firstName with nested structure
      mapSingleElement(schema.properties[nestedRootKey], tempElement)
    } else {
      const tempElement = {...formElement}
      const tempElementKey = tempElement.key
      mapRequiredProperty(schema, formElement)
      removeDraggableFields(tempElement)
      schema.properties[tempElementKey] = tempElement
    }
  }

  function mapRequiredProperty(schema: FormSchema, formElement: DraggableFormElement) {
    if (!schema.required) {
      schema.required = []
    }
    if (formElement.required) {
      if (!schema.required.includes(formElement.key)) {
        schema.required.push(formElement.key)
      }
    } else {
      schema.required = schema.required.filter(k => k !== formElement.key)
    }

  }

  return {mapDraggableToSchema}
}
