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
        "duplicated-section-114": {
          "sectionKey": "duplicated-section-114",
          "layout": {
            "component": "duplicated-section",
            "cols": {"xs": 12, "sm": 12, "md": 12, "lg": 12, "xl": 12, "xxl": 12},
            "offset": {"xs": 0, "sm": 0, "md": 0, "lg": 0, "xl": 0, "xxl": 0},
            "schema": {"type": "object", "properties": {}},
            "options": {
              "addBtnText": "Add element",
              "showDivider": false,
              "ordinalNumberInModel": false,
              "showFirstInitRow": true
            }
          },
          "editable": true,
          "showElements": true,
          sourcePath: "items",
          updateTriggers: ["select:value"],
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
