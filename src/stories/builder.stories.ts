// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3-vite';
import {ArgTypes} from 'storybook/internal/types';
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
        "text-field-987": {
          "label": "Item-text-field-987",
          "layout": {"cols": {"xs": 12, "sm": 12, "md": 12, "lg": 8, "xl": 8, "xxl": 8}, "component": "text-field"}
        },
        "text-field-987035_cloned": {
          "label": "text-field-987035_cloned",
          "layout": {"cols": {"xs": 12, "sm": 12, "md": 12, "lg": 2, "xl": 2, "xxl": 2}, "component": "text-field"}
        },
        "text-field-987035_cloned830_cloned": {
          "label": "text-field-987035_cloned830_cloned",
          "layout": {"cols": {"xs": 12, "sm": 12, "md": 12, "lg": 2, "xl": 2, "xxl": 2}, "component": "text-field"}
        },
        "item": {
          "label": "item",
          "layout": {"component": "text-field", "cols": {"xs": 12, "sm": 12, "md": 12, "lg": 8, "xl": 8, "xxl": 8}}
        },
        "text-field-073": {
          "label": "Item-text-field-073",
          "layout": {
            "cols": {"xs": 12, "sm": 12, "md": 12, "lg": 2, "xl": 2, "xxl": 2},
            "offset": {"xs": 0, "sm": 0, "md": 0, "lg": 2, "xl": 2, "xxl": 2},
            "component": "text-field"
          }
        }
      }
    }
  }
}

export const Fixing: Story = {
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
