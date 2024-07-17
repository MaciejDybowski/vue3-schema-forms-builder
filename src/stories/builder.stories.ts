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
    workspaceId: "faktury",
    modelValue: {
      "type": "object",
      "properties": {
        "name": {
          "label": "Imię",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "surname": {
          "label": "Nazwisko",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "duplicated-section-151": {
          "layout": {
            "component": "duplicated-section",
            "cols": 12,
            "schema": {
              "type": "object",
              "properties": {
                "text-field-604": {
                  "label": "Item-text-field-604",
                  "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
                },
                "item2": {
                  "label": "item2",
                  "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
                },
                "dictionary-414": {
                  "label": "Item-dictionary-414",
                  "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "dictionary", "props": {}},
                  "source": {"url": "", "title": "label", "value": "id"}
                }
              },
              "required": [],
              "options": {
                "fieldProps": {
                  "variant": "outlined",
                  "density": "compact",
                  "color": "primary",
                  "clearIcon": "mdi-close"
                }
              }
            },
            "props": {}
          }
        }
      },
      "options": {
        "fieldProps": {
          "variant": "outlined",
          "density": "compact",
          "color": "primary",
          "clearIcon": "mdi-close"
        }
      },
      "required": []
    },
    options: {}
  },
};

