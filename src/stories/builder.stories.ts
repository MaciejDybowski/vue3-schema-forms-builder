// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3';
import {ArgTypes} from '@storybook/types';
import VueSchemaFormsBuilder from "@/components/VueSchemaFormsBuilder.vue"

const meta = {
  title: 'Forms Builder',
  component: VueSchemaFormsBuilder,
  argTypes: {} as Partial<ArgTypes<any>>,
  args: {},
} satisfies Meta<typeof VueSchemaFormsBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormBuilderStory: Story = {
  args: {
    modelValue: { "type": "object", "properties": { "text-field-359": { "label": "Item-text-field-359", "layout": { "cols": 12, "offset": 0, "fillRow": false, "component": "text-field" } } } }
  },
};

