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
        "user": {
          "label": "Użytkownik",
          "layout": {"component": "user-input", "props": {"multiple": false}},
          "filter": {"group": null},
          "source": {"url": "/api/dictionaries?feature-id=supplier-users&vm=uzytkownikId&customAttributes=username%2C%7BuzytkownikNazwa%7D%2CfirstName%2C%7BuzytkownikImie%7D%2ClastName%2C%7BuzytkownikNazwisko%7D%2Cemail%2C%7BuzytkownikEmail%7D%2Clabels%2C%7Betykiety%7D"}
        },
      },
      "required": []
    }
  },
};

