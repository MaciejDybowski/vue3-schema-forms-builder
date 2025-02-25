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


const schema = {"type":"object","properties":{"fields-group-006":{"layout":{"component":"fields-group","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"schema":{"type":"object","properties":{"pole2":{"label":"Pole2","layout":{"component":"text-field"}},"pole3":{"label":"Pole3","layout":{"component":"text-field"}},"sekcjaPowielana":{"layout":{"component":"duplicated-section","cols":{"xs":12,"sm":12,"md":12,"lg":12,"xl":12,"xxl":12},"schema":{"type":"object","properties":{"pole1":{"label":"Pole1","layout":{"component":"text-field"}}},"required":[]},"options":{"addBtnText":"Add element","showDivider":false,"ordinalNumberInModel":false},"editable":true,"showElements":true}}},"required":[]},"props":{},"options":{"showDivider":false,"addBtnText":"Add"}}}},"required":[]}

export const GroupStory: Story = {
  args: {
    workspaceId: "forte",
    modelValue: schema,
  }
}
