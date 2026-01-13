// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3-vite';
import {ArgTypes} from 'storybook/internal/types';
import DevelopmentTable from "../.storybook/components/DevelopmentTable.vue";


const meta = {
  title: 'Forms Builder',
  component: DevelopmentTable,
  argTypes: {
    modelValue: {control: "object", description: "Schema u"},
  } as Partial<ArgTypes<any>>,
  args: {},
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table1: Story = {
  name: "URL słownika automatyczne kodowanie",
  args: {
    workspaceId: "bm",
    modelValue: {
      "type": "object",
      "properties": {
        "slownik": {
          "label": "Slownik",
          "layout": {
            "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
            "fillRow": true,
            "component": "dictionary"
          },
          "source": {
            "url": "/api/dictionaries?feature-id=powiaty1&lm=nazwa&vm=symbol&dm=asda%20test%20%7Basd%7D&customAttributes=symbol%2C%7Bsymbol%7D&filter=test%3D%3D{qwerty}",
            "title": "label",
            "value": "id",
            "description": "description",
            "returnObject": false,
            "lazy": true,
            "singleOptionAutoSelect": false,
            "multiple": false,
            "maxSelection": 0
          }
        }
      }
    }
  }
}
