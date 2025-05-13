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
    modelValue: {"type":"object","properties":{"duplicated-section-833":{"layout":{"component":"duplicated-section","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"schema":{"type":"object","properties":{}},"options":{"addBtnText":{"$ref":"#/i18n/~$locale~/qweqwe"},"showDivider":false,"ordinalNumberInModel":false,"showFirstInitRow":true,"addBtnMode":"add"}},"editable":true,"showElements":true}}}
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

