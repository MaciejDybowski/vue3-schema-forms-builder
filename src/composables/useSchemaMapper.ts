import {DraggableFormElement} from "@/models/DraggableFormElement";
import {Ref, ref} from "vue";

import {FormSchema} from "@/models/FormSchema";
import {useStyle} from "@/main";
import {copyObject} from "@/utils/copy";
import {isEmpty} from "lodash";
import {Layout} from "@/models/Layout";


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
    if (formElement.layout.component == 'dictionary'
      || (formElement.layout.component == "user-input" && formElement.source)
      || formElement.layout.component == 'combobox'
    ) {
      const copied = "builder_url" in formElement.source ? copyObject(formElement.source.builder_url) : "";
      delete formElement.source.builder_url;
      formElement.source.url = copied
    }
  }

  // funkcje i if'y czyszczące JSON do minimum dla silnika i przejrzystości
  function cleanJson(formElement: Partial<DraggableFormElement>) {
    const layout: Partial<Layout> = formElement.layout as Partial<Layout>
    const cols = {
      xs: 12,
      sm: 12,
      lg: 12,
    }
    if (formElement.layout && JSON.stringify(formElement.layout.cols) === JSON.stringify(cols)) {
      delete layout.cols
    }

    if (formElement.layout && formElement.layout.offset === 0) {
      delete layout.offset
    }

    if (formElement.layout && !formElement.layout.fillRow) {
      delete layout.fillRow
    }

    // jeżeli są propsy to czyścimy z jakiś zbędnych defaultów dla buildera
    if (formElement.layout && formElement.layout.props) {
      let props = formElement.layout.props
      if ('false-value' in props && props['false-value'] == null) {
        delete props["false-value"]
      }

      if ('true-value' in props && props['true-value'] == null) {
        delete props["true-value"]
      }
      if ("readOnly" in props && props.readOnly == false) {
        delete props.readOnly
      }
      if ("readonly" in props && props.readonly == false) {
        delete props.readonly
      }
    }

    if (formElement.layout && isEmpty(formElement.layout.props)) {
      delete layout.props
    }

    if (!formElement.formatInModel) {
      delete formElement.formatInModel
    }
  }

  return {mapDraggableToSchema}
}
