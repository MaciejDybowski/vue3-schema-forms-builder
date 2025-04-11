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
        "text-field-442": {
          "label": "Item-text-field-442",
          "layout": {"cols": {"xs": 12, "sm": 12, "md": 12, "lg": 4, "xl": 4, "xxl": 4}, "component": "text-field"}
        },
        "text-field-442178_cloned": {
          "label": "text-field-442178_cloned",
          "layout": {"cols": {"xs": 12, "sm": 12, "md": 12, "lg": 4, "xl": 4, "xxl": 4}, "component": "text-field"}
        },
        "text-field-442242_cloned": {
          "label": "text-field-442242_cloned",
          "layout": {"cols": {"xs": 12, "sm": 12, "md": 12, "lg": 4, "xl": 4, "xxl": 4}, "component": "text-field"}
        }
      }
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

