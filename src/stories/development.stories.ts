// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3-vite';
import {ArgTypes} from 'storybook/internal/types';
import DevelopmentTable from "../../.storybook/components/DevelopmentTable.vue";


const meta = {
  title: 'Development Area / Forms Builder',
  component: DevelopmentTable,
  argTypes: {
    modelValue: {control: "object", description: "Schema u"},
  } as Partial<ArgTypes<any>>,
  args: {},
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table1: Story = {
  name: "Example 1",
  args: {
    workspaceId: "bm",
    showJson: true,
    modelValue: {
      "type": "object",
      properties: {}
    }
  }
}
