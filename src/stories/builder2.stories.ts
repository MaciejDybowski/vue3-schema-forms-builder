// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3';
import {ArgTypes} from '@storybook/types';
import DevelopmentTable from "@/components/storybook-components/DevelopmentTable.vue"

const meta = {
  title: 'Forms Builder migration',
  component: DevelopmentTable,
  argTypes: {} as Partial<ArgTypes<any>>,
  args: {},
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormBuilderStory: Story = {
  args: {
    workspaceId: "faktury",
    modelValue: {
      "type": "object",
      "properties": {

        "dictionary-974":
          {
            "label":
              "Item-dictionary-974",
            "layout":
              {
                "cols":
                  12,
                "offset":
                  0,
                "fillRow":
                  false,
                "component":
                  "dictionary",
                "props":
                  {}
              },
            "source":
              {
                "url":
                  "/api/dictionaries?feature-id=contracts&dm=Podmiot%3A%20%7Bname%7D%2C%20identyfikator%3A%20%7Btin%7D&lm=contractNumber&vm=id",
                "title":
                  "label",
                "value":
                  "id"
              }
          }
      },
      "required": []
    }
  },
};

