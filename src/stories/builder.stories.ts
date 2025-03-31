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
        "name": {"label": {"$ref": "#/i18n/~$locale~/name"}, "layout": {"component": "text-field"}},
        "lastName": {"label": {"$ref": "#/i18n/~$locale~/lastName"}, "layout": {"component": "text-field"}}
      },
      "required": [],
      "i18n": {"pl": {"name": "Imię", "lastName": "Naziwsko"}, "en": {"name": "Name", "lastName": "Last name"}}
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

