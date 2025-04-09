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
        "tableOfItems": {
          "layout": {"component": "table-view"},
          "source": {
            "data": "",
            "headers": [{"title": {"$ref": "#/i18n/~$locale~/name"}}, {"title": {"$ref": "#/i18n/~$locale~/surname"}}, {"title": "Value"}],
            "buttons": []
          },
          "actions": {}
        }
      },
      "i18n": {
        "pl": {"name": "Imię", "surname": "Nazwisko"},
        "en": {"name": "Name", "surname": "Surname"},
        "de": {"name": "NAME", "surname": "SURNAME"}
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

