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

export const FormBuilderEmpty: Story = {
  args: {
    workspaceId: "bm",
    modelValue: {
      "type": "object",
      "properties": {
        "checkbox-379": {
          "label": "Item-checkbox-379",
          "layout": {"component": "checkbox", "props": {"multiple": true}},
          "source": {
            "items": [{"value": 1, "title": "Option 1"}, {"value": 2, "title": "Option 2"}, {
              "value": 3,
              "title": "Option 3"
            }]
          }
        }
      }
    }
  }
}

export const Table1 = {
  args: {
    workspaceId: "bm",
    modelValue: {
      "type": "object",
      "properties": {}
    }
  }
}
