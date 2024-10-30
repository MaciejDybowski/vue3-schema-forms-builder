// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3';
import {ArgTypes} from '@storybook/types';
import DevelopmentTable from "@/components/storybook-components/DevelopmentTable.vue"

const meta = {
  title: 'Forms Builder',
  component: DevelopmentTable,
  argTypes: {} as Partial<ArgTypes<any>>,
  args: {},
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormBuilderStory: Story = {
  args: {
    workspaceId: "bm",
    modelValue: {
      "type": "object",
      "properties": {
        "sekcjaA": {
          "layout": {
            "component": "duplicated-section",
            "cols": {"xs": 12, "sm": 12, "lg": 12},
            "schema": {
              "type": "object",
              "properties": {"poleA": {"label": "Pole A", "layout": {"component": "text-area"}}},
              "required": []
            },
            "options": {"addBtnText": "Add element", "showDivider": false, "ordinalNumberInModel": false},
            "editable": true,
            "showElements": true
          }
        },
        "sekcjaB": {
          "layout": {
            "component": "duplicated-section",
            "cols": {"xs": 12, "sm": 12, "lg": 12},
            "schema": {
              "type": "object",
              "properties": {"poleA": {"label": "Pole A", "layout": {"component": "text-area"}}},
              "required": []
            },
            "options": {"addBtnText": "Add element", "showDivider": false, "ordinalNumberInModel": false},
            "editable": true,
            "showElements": true
          }
        }
      },
      "required": []
    }
  },
};

