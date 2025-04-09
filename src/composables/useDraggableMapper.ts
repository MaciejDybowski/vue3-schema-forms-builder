import {DraggableFormElement} from "@/models/DraggableFormElement";
import {Ref, ref} from "vue";
import {FormSchema} from "@/models/FormSchema";
import {SchemaFormElement} from "@/models/SchemaFormElement";
import {FormOptions} from "@/models/FormOptions";
import {isNumber} from "lodash";
import {mergeObjects} from "@/utils";

export function useDraggableMapper() {


  function mapSchemaToDraggable(formSchema: FormSchema, formOptions: FormOptions, globalI18n: object): Array<DraggableFormElement> {
    const draggableElements: Ref<DraggableFormElement[]> = ref([])

    Object.entries(formSchema.properties).forEach(([key, schemaElement]: [string, SchemaFormElement]) => {

      if (isNestedFields(schemaElement)) {
        const mappedFields = [...mapSchemaToDraggable(schemaElement as FormSchema, formOptions, globalI18n)]
          .map(item => {
            item.key = `${key}.${item.key}`
            return item
          })
        draggableElements.value.push(...mappedFields)

      } else {
        mapSingleElement(formSchema, formOptions, draggableElements, key, schemaElement, globalI18n)
      }

    })

    return draggableElements.value
  }

  function mapSingleElement(formSchema: FormSchema, formOptions: FormOptions, draggableElements: Ref<DraggableFormElement[]>, key: string, schemaElement: SchemaFormElement, globalI18n: object) {

    if (schemaElement.$ref && schemaElement.$ref !== "") {
      const draggableElement = {
        formId: 'builder-tecna-id',
        key: key,
        ref: schemaElement.$ref
      } as DraggableFormElement
      draggableElements.value.push(draggableElement)
      return
    }

    fillSchemaForBuilderPurpose(schemaElement)

    if (schemaElement.layout.schema) {
      schemaElement.layout.schema.options = formOptions
      schemaElement.tempItems = mapSchemaToDraggable(schemaElement.layout.schema, formOptions, formSchema.i18n).map((item) => {
        item["sectionKey"] = key
        return item
      })
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

    /*
    * Sprawdzenie czy przychodzi nam $ref oraz pobranie obiektu dla lokalnego elementu z globalnego i18n, trzeba uważać na zagnieżdzenia item.property
    * */
    if (draggableElement.label && draggableElement.label.$ref) {
      const labelKey = draggableElement.label.$ref.split("/").pop()
      draggableElement.i18n = extractKey(globalI18n, labelKey)
    }
    if (draggableElement.content && draggableElement.content.$ref) {
      const labelKey = draggableElement.content.$ref.split("/").pop()
      draggableElement.i18n = extractKey(globalI18n, labelKey)
    }
    if (draggableElement.layout.component == 'table-view') {
      const keys = extractRefKeys(draggableElement)
      keys.forEach(extractedKey => {
        const translations = extractKey(globalI18n, extractedKey);
        draggableElement.i18n = mergeObjects(draggableElement.i18n, translations)
      });
    }
    /*
     Koniec mapowań
     */
    dictionarySourceBuilderMapping(draggableElement)

    draggableElements.value.push(draggableElement)
  }

  function extractRefKeys(obj) {
    const keys: string[] = [];

    function recurse(current) {
      if (typeof current !== 'object' || current === null) {
        return;
      }

      if (current.$ref && typeof current.$ref === 'string') {
        const key = current.$ref.split('/').pop() as string;
        keys.push(key);
      }

      for (const value of Object.values(current)) {
        recurse(value);
      }
    }

    recurse(obj);

    return keys;
  }

  function extractKey(i18n: object, key: string) {
    return Object.fromEntries(
      Object.entries(i18n).map(([lang, values]) => [lang, {[key]: values[key]}])
    );
  }

  function dictionarySourceBuilderMapping(draggableElement: DraggableFormElement) {
    if (draggableElement.layout.component == 'dictionary'
      || (draggableElement.layout.component == 'user-input' && draggableElement.source)
      || draggableElement.layout.component == 'combobox'
      || draggableElement.layout.component == 'ordered-multi-select'
    ) {
      const copy = draggableElement.source.url
      draggableElement.source.url = ""
      draggableElement.source.builder_url = copy
    }
  }

  function isNestedFields(schemaElement: SchemaFormElement) {
    return "properties" in schemaElement;
  }

  // funkcja uzupełnia wszystkie mapowania potrzebne do działania prawego panelu mapowania kontrolek na JSON Scheme
  function fillSchemaForBuilderPurpose(schemaElement: SchemaFormElement) {

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
        xs: schemaElement.layout.cols,
        sm: schemaElement.layout.cols,
        md: schemaElement.layout.cols,
        lg: schemaElement.layout.cols,
        xl: schemaElement.layout.cols,
        xxl: schemaElement.layout.cols,
      }
    }
    if (schemaElement.layout.cols === undefined) {
      schemaElement.layout.cols = {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 12
      }
    }
    if ('lg' in schemaElement.layout.cols) {
      schemaElement.layout.cols = {
        xs: schemaElement.layout.cols.xs,
        sm: schemaElement.layout.cols.sm,
        md: schemaElement.layout.cols.sm,
        lg: schemaElement.layout.cols.lg,
        xl: schemaElement.layout.cols.lg,
        xxl: schemaElement.layout.cols.lg,
      }
    }
  }

  return {mapSchemaToDraggable}
}
