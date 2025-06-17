import {Layout} from "@/models/Layout";

export interface DraggableFormElement {
  on: any
  options: object

  required: boolean

  key: string


  layout: Layout
  source?: any

  // duplicated-section
  tempItems?: any
  formatInModel?: string

  sectionKey?: string
  ref?: string
  i18n?: Record<any, any>
  label?: string | any
  content?: any
}
