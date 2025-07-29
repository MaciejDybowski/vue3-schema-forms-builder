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
        "text-field-990": {
          "label": "Item-text-field-990",
          "layout": {"component": "text-field", "cellClass": "pb-1"}
        },
        "text-switch-field-540": {
          "content": "Change me",
          "label": "Item-text-switch-field-540",
          "layout": {"component": "text-switch-field", "cellClass": "py-0"}
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
