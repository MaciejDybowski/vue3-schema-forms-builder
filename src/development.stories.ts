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
          updateTriggers: ["select:value,other:id"],
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
      "properties": {
        "firstName": {"label": "Imie", "layout": {"component": "text-field"}},
        "lastName": {"label": "Nazwisko", "layout": {"component": "text-field"}}
      }
    }
  }
}

export const Demo = {
  args: {
    workspaceId: "bm",
      modelValue: {
        "type": "object",
        "properties": {
          "textField": {"label": "Pole tekstowe", "layout": {"component": "text-field"}},
          "textArea": {"label": "Obszar tekstowy", "layout": {"component": "text-area"}},
          "numberField": {"label": "Pole liczbowe", "layout": {"component": "number-field"}, "type": "int"},
          "datePicker": {"label": "Date picker", "layout": {"component": "date-picker"}},
          "dateTimePicker": {"label": "Date-time picker", "layout": {"component": "date-time-picker"}},
          "switch": {"label": "Pole przełącznik", "layout": {"component": "switch"}},
          "radioButton": {
            "label": "Pole typu radio",
            "layout": {"component": "radio-button"},
            "source": {
              "items": [{"value": 1, "title": "Option 1"}, {"value": 2, "title": "Option 2"}, {
                "value": 3,
                "title": "Option 3"
              }]
            }
          },
          "select": {
            "label": "Pole wyboru",
            "layout": {"component": "select"},
            "source": {
              "items": [{"value": 1, "title": "Option 1"}, {"value": 2, "title": "Option 2"}, {
                "value": 3,
                "title": "Option 3"
              }]
            }
          },
          "userInput": {"label": "Pole użytkownik", "layout": {"component": "user-input"}, "source": {"url": ""}}
        }
      }
  }
}
