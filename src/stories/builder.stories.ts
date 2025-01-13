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
    modelValue: {
      "type": "object",
      "properties": {
        "tableOfRelationships": {
          "layout": {"component": "table-view"},
          "source": {
            "data": "/api/v1/customers/{dataId}/relationships",
            "headers": [{"title": "Identyfikator", "key": "id", "type": "TEXT"}, {
              "title": "Nazwa",
              "key": "name",
              "type": "TEXT"
            }]
          },
          "actions": {}
        }
      },
      "required": []
    },
  }
}

