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
        "static-content-719": {
          "content": {"$ref": "#/i18n/~$locale~/staticContent719"},
          "layout": {"component": "static-content", "tag": "h1"}
        },
        "test": {
          "properties": {
            "poqwert": {
              "content": {"$ref": "#/i18n/~$locale~/testPoqwert"},
              "layout": {"component": "static-content", "tag": "p"}
            }
          }
        },
        "text-field-010": {"label": {"$ref": "#/i18n/~$locale~/textField010"}, "layout": {"component": "text-field"}}
      },
      "i18n": {
        "pl": {"staticContent719": "qwewqe", "testPoqwert": "qwe", "textField010": "qwewqewq"},
        "en": {"staticContent719": "teqwe", "testPoqwert": "qwewq", "textField010": "qwewqeqewq"},
        "de": {"staticContent719": "qwewqe", "testPoqwert": "qwewqe", "textField010": "qwewqeeqweqw"}
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

