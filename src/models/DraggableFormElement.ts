import {Layout} from "@/models/Layout";

export interface DraggableFormElement {
  formId: string,
  on: any
  options: object

  required: boolean

  key: string


  layout: Layout
  source?: any

  // duplicated-section
  tempItems?: any
}
