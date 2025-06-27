// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3-vite';
import {ArgTypes} from 'storybook/internal/types';
import DevelopmentTable from "../../.storybook/components/DevelopmentTable.vue"

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
        "year-picker-606": {
          "label": "Item-year-picker-606",
          "layout": {"component": "year-picker"},
          "range": [2000, 3200]
        }
      }
    }
  }
}

export const Fixing
  :
  Story = {
  args: {
    workspaceId: "bm",
    modelValue: {
      "type": "object",
      "properties": {
        "groupOne": {
          "layout": {
            "component": "fields-group",
            "cols": {"xs": 12, "sm": 12, "md": 12, "lg": 12, "xl": 12, "xxl": 12},
            "schema": {
              "type": "object",
              "properties": {
                "item": {
                  "label": "Item",
                  "layout": {
                    "cols": {"xs": 12, "sm": 12, "md": 12, "lg": 6, "xl": 6, "xxl": 6},
                    "component": "text-field"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
