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
      "type": "object", "properties": {
        "htmlDaneDost": {
          "content": "Dane dostawcy",
          "layout": {"component": "static-content", "tag": "h3", "cols": 12, "props": {}}
        },
        "dostawca": {
          "properties": {
            "nr": {
              "label": "Numer dostawcy",
              "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
            },
            "nazwa": {
              "label": "Nazwa dostawcy",
              "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
            },
            "nip": {
              "label": "NIP",
              "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
            },
            "adres": {
              "content": "<b>Adres:</b> Ulica, Nr domu/lokalu/mieszkania, Kod pocztowy, Miejscowość, Kraj",
              "layout": {"component": "static-content", "tag": "p", "cols": 12, "props": {}}
            }
          }, "required": []
        },
        "htmlDaneFaktury": {
          "content": "Dane faktury",
          "layout": {"component": "static-content", "tag": "h3", "cols": 12, "props": {}},
          "label": ""
        },
        "faktura": {
          "properties": {
            "nrReferencyjny": {
              "label": "Numer referencyjny",
              "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
            },
            "nrFaktury": {
              "label": "Nr faktury",
              "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
            },
            "nrKsef": {
              "label": "Nr KSEF",
              "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
            },
            "TypDokumentu": {
              "label": "Typ dokumentu",
              "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "select", "props": {}},
              "source": {
                "items": [{"value": 1, "title": "Option 1"}, {"value": 2, "title": "Option 2"}, {
                  "value": 3,
                  "title": "Option 3"
                }]
              }
            },
            "dataWystawienia": {
              "label": "Data wystawienia",
              "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "date-picker", "props": {}}
            },
            "dataPlatnosci": {
              "label": "Data płatności",
              "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "date-picker", "props": {}}
            },
            "dataWplywu": {
              "label": "Data wpływu",
              "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "date-picker", "props": {}}
            },
            "dataWpisuDa": {
              "label": "Data wpisu do DA",
              "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "date-picker", "props": {}}
            },
            "dataSprzedazy": {
              "label": "Data sprzedaży",
              "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "date-picker", "props": {}}
            },
            "Waluta": {
              "label": "Waluta",
              "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "dictionary", "props": {}},
              "source": {"url": "", "title": "label", "value": "id"}
            },
            "kurs": {
              "label": "Kurs",
              "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
            },
            "sumyFakturaOplac": {
              "label": "Faktura opłacona",
              "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "dictionary", "props": {}},
              "source": {"url": "", "title": "label", "value": "id"}
            }
          }, "required": ["nrFaktury", "dataWplywu", "dataSprzedazy"]
        },
        "podsumowanie": {
          "content": "Podsumowanie - kwoty otrzymane",
          "layout": {"component": "static-content", "tag": "h3", "cols": 12, "props": {}},
          "required": []
        }
      }, "required": ["nrFaktury", "dataWplywu", "dataSprzedazy", "osMerytoryczne"]
    }
  },
};

