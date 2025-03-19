// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3';
import {ArgTypes} from '@storybook/types';
import DevelopmentTable from "@/components/storybook-components/DevelopmentTable.vue"

const meta = {
  title: 'Forms Builder',
  component: DevelopmentTable,
  argTypes: {
    modelValue: { control: "object", description: "Schema u" },
  } as Partial<ArgTypes<any>>,
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
        "text-field-130":
          {
            "label": {$ref: "#/i18n/~$locale~/input1"},
            "layout": {"component": "text-field"}
          }
      },
      "required": [],
      "i18n": {
        "pl": {
          input1: "PL Input"
        },
        "en": {
          input1: "EN Input"
        }
      }
    },
  }
}

export const FormBuilderStoryRef
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


const schema = {
  "type": "object",
  "properties": {
    "fields-group-006": {
      "layout": {
        "component": "fields-group",
        "cols": {"xs": 12, "sm": 12, "md": 12, "lg": 12, "xl": 12, "xxl": 12},
        "schema": {
          "type": "object",
          "properties": {
            "pole2": {"label": "Pole2", "layout": {"component": "text-field"}},
            "pole3": {"label": "Pole3", "layout": {"component": "text-field"}},
            "sekcjaPowielana": {
              "layout": {
                "component": "duplicated-section",
                "cols": {"xs": 12, "sm": 12, "md": 12, "lg": 12, "xl": 12, "xxl": 12},
                "schema": {
                  "type": "object",
                  "properties": {"pole1": {"label": "Pole1", "layout": {"component": "text-field"}}},
                  "required": []
                },
                "options": {"addBtnText": "Add element", "showDivider": false, "ordinalNumberInModel": false},
                "editable": true,
                "showElements": true
              }
            }
          },
          "required": []
        },
        "props": {},
        "options": {"showDivider": false, "addBtnText": "Add"}
      }
    }
  },
  "required": []
}

export const GroupStory
  :
  Story = {
  args: {
    workspaceId: "forte",
    modelValue: schema,
  }
}
