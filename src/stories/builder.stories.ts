// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3';
import {ArgTypes} from '@storybook/types';
import DevelopmentTable from "@/components/storybook-components/DevelopmentTable.vue"

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
        "text-field-587": {
          "label": "Item-text-field-587",
          "layout": {"cols": {"xs": 6, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4}, "component": "text-field"}
        },
        "text-field-867": {
          "label": "Item-text-field-867",
          "layout": {"cols": {"xs": 12, "sm": 12, "md": 12, "lg": 4, "xl": 4, "xxl": 4}, "component": "text-field"}
        }
      },
      "required": [],
      "i18n": {}
    }
  }
}

export const FormBuilderRefTable
  :
  Story = {
  args: {
    workspaceId: "bm",
    modelValue: {
      "type": "object",
      "properties": {"tableOfRelationships": {"$ref": "http://aureadev.tecna.pl/formularz-1.json"}},
      "required": []
    }
  }
}

