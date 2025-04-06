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
        "wrapper": {
          "properties": {
            "item1": {
              "label": {"$ref": "#/i18n/~$locale~/wrapperitem1"},
              "layout": {"component": "text-field"}
            }
          },
          "required": [],
          "i18n": {
            "pl": {"wrapperitem1": "wrapper_ite1m2"},
            "en": {"wrapperitem1": "wrapper_item1"},
            "de": {"wrapperitem1": "qwerty"}
          }
        }, "item": {"label": {"$ref": "#/i18n/~$locale~/item"}, "layout": {"component": "text-field"}}
      },
      "required": [],
      "i18n": {"pl": {"item": "pl_item"}, "en": {"item": "en_item"}, "de": {"item": "qweqwrt"}}
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

