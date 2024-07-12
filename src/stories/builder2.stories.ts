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
    model: {
      "type": "object", "properties": {
        "htmlDaneDost": {
          "content": "Dane dostawcy",
          "layout": {"component": "static-content", "tag": "h3", "cols": 12, "props": {}}
        },
        "nrDostawcy": {
          "label": "Numer dostawcy",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "nazwaDostawcy": {
          "label": "Nazwa dostawcy",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "nip": {
          "label": "NIP",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "adres": {
          "content": "<i>Ulica, nr domu/lokalu/mieszkania, Kod pocztowy, Miejscowość, Kraj",
          "layout": {"component": "static-content", "tag": "p", "cols": 12, "props": {}}
        },
        "htmlDaneFaktury": {
          "content": "Dane faktury",
          "layout": {"component": "static-content", "tag": "h3", "cols": 12, "props": {}},
          "label": ""
        },
        "nrReferencyjny": {
          "label": "Numer referencyjny",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "nrFaktury": {
          "label": "Nr faktury",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "selTypDokumentu": {
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
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "date-picker", "props": {}}
        },
        "dataWpisuDa": {
          "label": "Data wpisu do DA",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "date-picker", "props": {}}
        },
        "selWaluta": {
          "label": "Waluta",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "dictionary", "props": {}},
          "source": {"url": "", "title": "label", "value": "id"}
        },
        "kurs": {
          "label": "Kurs",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "duplicated-section-224": {
          "layout": {
            "component": "duplicated-section", "cols": 12,
            "schema": {
              "type": "object",
              "properties": {
                "pozycjeDokumentu": {
                  "content": "Pozycje dokumentu",
                  "layout": {"component": "static-content", "tag": "h3", "cols": 12}
                },
                "selNazwa": {
                  "label": "Nazwa",
                  "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "dictionary"},
                  "source": {"url": "", "title": "label", "value": "id"}
                },
                "pozOpis": {
                  "label": "Opis zdarzenia gospodarczego",
                  "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-area"}
                },
                "pozycjaKwotaNetto": {
                  "label": "Kwota netto",
                  "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field"}
                },
                "pozycjaKwotaVat": {
                  "label": "Kwota VAT",
                  "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "dictionary"},
                  "source": {"url": "", "title": "label", "value": "id"}
                },
                "pozycjaKwotaBrutto": {
                  "label": "Kwota brutto",
                  "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field"}
                },
                "pozycjaKwotaNettoPln": {
                  "label": "Kwota netto PLN",
                  "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field"}
                },
                "pozycjaKwotaVatPln": {
                  "label": "Kwota VAT PLN",
                  "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field"}
                },
                "pozycjaKwotaBruttoPln": {
                  "label": "Kwota brutto PLN",
                  "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field"}
                },
                "selRodzajKosztu": {
                  "label": "Rodzaj kosztu",
                  "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "dictionary"},
                  "source": {"url": "", "title": "label", "value": "id"}
                },
                "selMiejscePowstaniaKosztu": {
                  "label": "Miejsce powstania kosztu",
                  "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "dictionary"},
                  "source": {"url": "", "title": "label", "value": "id"}
                },
                "pozycjaNumerZamowienia": {
                  "label": "Numer zamówienia",
                  "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field"}
                },
                "pozycjaNumerZlecenia": {
                  "label": "Numer zlecenia",
                  "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field"}
                },
                "pozycjaSelElement4": {
                  "label": "Element 4",
                  "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "dictionary"},
                  "source": {"url": "", "title": "label", "value": "id"}
                },
                "pozycjaElement5": {
                  "label": "Element 5",
                  "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field"}
                },
                "pozycjaNosnik": {
                  "label": "Nośnik",
                  "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field"}
                },
                "pozycjaSelNumerProjektu": {
                  "label": "Numer projektu",
                  "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "dictionary"},
                  "source": {"url": "", "title": "label", "value": "id"}
                },
                "pozSelOsobaAutoryzujaca": {
                  "label": "Osoba autoryzująca",
                  "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "dictionary"},
                  "source": {"url": "", "title": "label", "value": "id"}
                }
              }, "required": []
            }, "props": {}
          }
        },
        "podsumowanie": {
          "content": "Podsumowanie - kwoty otrzymane",
          "layout": {"component": "static-content", "tag": "h3", "cols": 12, "props": {}}
        },
        "lPozycji": {
          "label": "Liczba pozycji",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "kwotaNetto": {
          "label": "Kwota netto",
          "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "kwotaVat": {
          "label": "Kwota VAT",
          "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "kwotaBrutto": {
          "label": "Kwota Brutto",
          "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "htmlSumyOpisuMeryt": {
          "content": "<b>Sumy opisu merytorycznego</b>",
          "layout": {"component": "static-content", "tag": "p", "cols": 12, "props": {}}
        },
        "sumyKwotaNetto": {
          "label": "Kwota netto",
          "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "sumyKwotaVat": {
          "label": "Kwota VAT",
          "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "sumyKwotaBrutto": {
          "label": "Kwota brutto",
          "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "sumyKwotaNettoPln": {
          "label": "Kwota netto PLN",
          "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "sumyKwotaVatPln": {
          "label": "Kwota VAT PLN",
          "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "sumyKwotaBruttoPln": {
          "label": "Kwota brutto PLN",
          "layout": {"cols": 4, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "sumyFakturaOplac": {
          "label": "Faktura opÅ‚acona",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "dictionary", "props": {}},
          "source": {"url": "", "title": "label", "value": "id"}
        },
        "sumyDyspozycjaWartosci": {
          "label": "Dyspozycja wartości zapłaty faktury",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "dictionary", "props": {}},
          "source": {"url": "", "title": "label", "value": "id"}
        },
        "htmlrejestracja ": {
          "content": "Rejestracja ",
          "layout": {"component": "static-content", "tag": "h3", "cols": 12, "props": {}}
        },
        "selOpisujacyMerytorycznie": {
          "label": "Opisujący merytorycznie",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "dictionary", "props": {}},
          "source": {"url": "", "title": "label", "value": "id"}
        },
        "selOsobaKsiegujaca": {
          "label": "Osoba księgująca",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "dictionary", "props": {}},
          "source": {"url": "", "title": "label", "value": "id"}
        },
        "opisDecyzja": {
          "label": "Decyzja",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "select", "props": {}},
          "source": {
            "items": [{"value": 1, "title": "Option 1"}, {"value": 2, "title": "Option 2"}, {
              "value": 3,
              "title": "Option 3"
            }]
          }
        },
        "rejestrujacy": {
          "label": "Rejestrujący",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "dataRejestracji": {
          "label": "Data rejestracji",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "date-picker", "props": {}}
        },
        "htmldekretacja": {
          "content": "Dekretacja",
          "layout": {"component": "static-content", "tag": "h3", "cols": 12, "props": {}}
        },
        "rejestracjaDecyzja": {
          "label": "Decyzja",
          "layout": {"cols": 12, "offset": 0, "fillRow": false, "component": "select", "props": {}},
          "source": {
            "items": [{"value": 1, "title": "Option 1"}, {"value": 2, "title": "Option 2"}, {
              "value": 3,
              "title": "Option 3"
            }]
          }
        },
        "opisujacy": {
          "label": "Opisujący",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "text-field", "props": {}}
        },
        "dataWykonaniaOpisu": {
          "label": "Data wykonania opisu",
          "layout": {"cols": 6, "offset": 0, "fillRow": false, "component": "date-picker", "props": {}}
        }
      }, "options": {"fieldProps": {"variant": "outlined", "density": "compact", "color": "primary"}}, "required": []
    }
  },
};

