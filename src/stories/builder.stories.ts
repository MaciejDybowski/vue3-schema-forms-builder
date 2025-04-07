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
    modelValue: {"type":"object","properties":{"item":{"label":{"$ref":"#/i18n/~$locale~/item"},"layout":{"component":"text-field","cols":{"xs":12,"sm":12,"md":12,"lg":4,"xl":4,"xxl":4}}},"wrapper":{"properties":{"item1":{"label":{"$ref":"#/i18n/~$locale~/wrapperitem1"},"layout":{"component":"text-field","cols":{"xs":12,"sm":4,"md":4,"lg":4,"xl":4,"xxl":4}}}}},"text-field-277":{"label":"Item-text-field-277","layout":{"cols":{"xs":12,"sm":12,"md":12,"lg":2,"xl":2,"xxl":2},"component":"text-field"}}},"i18n":{"pl":{"item":"pl_item","wrapperitem1":"wrapper_ite1m2"},"en":{"item":"en_item","wrapperitem1":"wrapper_item1"},"de":{"item":"qweqwrt","wrapperitem1":"qwerty"}}}
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

