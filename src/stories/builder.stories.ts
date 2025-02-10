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
            "buttons": [
              {
                label: "Add products",
                btnProps: {
                  color: "primary",
                  rounded: false,
                },
                mode: "action",
                config: {
                  code: "batchAdd", // na froncie jest sprawdzanie jak batchAdd to i tak woła skrypt bo w obsłudze zadanie jest tylko jedna uniwersalna akcja
                  featureId: "products",
                  viewId: "94578-tabela",
                  batchAddAttributePath: "dataId",
                  scriptName: "add_products_to_offer",
                },
              },
            ],
            "headers": [
              {
                "title": "Identyfikator",
                valueMapping: "Test",
                "key": "id",
                "type": "TEXT"
              },
              {
                "title": "Nazwa",
                "key": "name",
                "type": "TEXT"
              },
              {
                title: "",
                key: "actions",
                actions: [
                  {
                    icon: "mdi-delete-outline",
                    mode: "action",
                    code: "callScript",
                    config: {
                      params: {
                        script: "delete_product_from_offer",
                      },
                      body: {
                        dataId: "{product.id}",
                      },
                    },
                    props: {
                      color: "error",
                    },
                  },
                  {
                    condition: "",
                    icon: "mdi-shipping-pallet",
                    mode: "action",
                    code: "callScript",
                    config: {
                      params: {
                        script: "add_pallet_price",
                      },
                      body: {
                        dataId: "{product.id}",
                      },
                    },
                    props: {
                      color: "primary",
                    },
                  },
                ],
              },]
          },
          "actions": {
            "name": "nameAndCosTam"
          }
        }
      },
      "required": []
    },
  }
}

