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
    workspaceId: "bm",
    modelValue: {"type":"object","properties":{"duplicated-section-165":{"layout":{"component":"duplicated-section","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"schema":{"type":"object","properties":{}},"options":{"addBtnText":"Add element","showDivider":false,"ordinalNumberInModel":false,"addBtnMode":"action","action":{"code":"batchAddCostam"}},"editable":true,"showElements":true}}},"required":[]}
  },
};

