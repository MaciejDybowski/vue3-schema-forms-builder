import {FromElementComponent} from "@/models/FromElementComponent";

export interface ElementDrawerFromElement {
  icon: string
  label: string,
  subtitle?: string,
  component: FromElementComponent,
  tag?: string
}
