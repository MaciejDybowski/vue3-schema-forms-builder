import {DraggableFormElement} from "@/models/DraggableFormElement";
import {Ref, ref} from "vue";

import {FormSchema} from "@/models/FormSchema";
import {useStyle} from "@/main";
import {copyObject} from "@/utils/copy";
import {isEmpty} from "lodash";


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
    schema.value.required = []

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
    const tempElement = copyObject(formElement)
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
      delete formElement.layout?.schema.options
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
      mapUrlInDictionary(tempElement)


      cleanJson(tempElement)
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

  function mapUrlInDictionary(formElement: DraggableFormElement) {
    if (formElement.layout.component == 'dictionary' || (formElement.layout.component == "user-input" && formElement.source)) {
      const copied = "builder_url" in formElement.source ? copyObject(formElement.source.builder_url) : "";
      delete formElement.source.builder_url;
      formElement.source.url = copied
    }
  }

  // funkcje i if'y czyszczące JSON do minimum dla silnika i przejrzystości
  function cleanJson(formElement: DraggableFormElement) {
    const cols = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      xxl: 12,
    }
    if (JSON.stringify(formElement.layout.cols) === JSON.stringify(cols)) {
      delete formElement.layout.cols
    }

    if (isEmpty(formElement.layout.props)) {
      delete formElement.layout.props
    } else if (Object.keys(formElement.layout.props).length == 1 && formElement.layout.props.readOnly == false) {
      delete formElement.layout.props
    }

    if (formElement.layout.offset === 0) {
      delete formElement.layout.offset
    }

    if (!formElement.layout.fillRow) {
      delete formElement.layout.fillRow
    }

  }

  return {mapDraggableToSchema}
}
