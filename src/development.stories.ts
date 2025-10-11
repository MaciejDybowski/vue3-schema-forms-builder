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
        "dictionary704": {
          "label": "Item-dictionary704",
          "layout": {"component": "dictionary"},
          "source": {
            "url": "",
            "title": "label",
            "value": "id",
            "returnObject": true,
            "lazy": true,
            "singleOptionAutoSelect": true,
            "multiple": false,
            "maxSelection": 0
          }
        }
      }
    },
  }
}
