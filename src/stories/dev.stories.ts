// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3';
import {ArgTypes} from '@storybook/types';
import ComponentWrapper from "../components/storybook-components/ComponentWrapper.vue";

const meta = {
  title: 'TranslateInput',
  component: ComponentWrapper,
  argTypes: {
    modelValue: {control: "object", description: "v-model bind for component"},
    component: {control: "string", description: "component"},
  } as Partial<ArgTypes<any>>,
  args: {},
} satisfies Meta<typeof ComponentWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table1: Story = {
  args: {
    modelValue: {label: ""},
  }
}

