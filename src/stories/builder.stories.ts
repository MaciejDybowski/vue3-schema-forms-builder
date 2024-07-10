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
    workspaceId: "faktury",
    model: {"type": "object",
      "properties": {
        "name": {
          "label": "Imię",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field"}
        },
        "surname": {
          "label": "Nazwisko",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field"}
        }
      }
    }
  },
};

