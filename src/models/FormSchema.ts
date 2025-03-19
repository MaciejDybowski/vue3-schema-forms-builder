export interface FormSchema {
  type: string
  properties: object,
  required?: string[]

  // form builder
  options?: any
  i18n?: any
}
