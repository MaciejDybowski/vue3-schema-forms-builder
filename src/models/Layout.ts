import {FromElementComponent} from "@/models/FromElementComponent";
import {FormSchema} from "@/models/FormSchema";

export interface Layout {
  component: FromElementComponent
  schema: FormSchema
  cols: object
  offset: object
  fillRow: boolean
  props: any
}
