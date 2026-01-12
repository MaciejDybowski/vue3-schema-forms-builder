// @ts-nocheck
import {Meta, StoryObj} from '@storybook/vue3-vite';
import {ArgTypes} from 'storybook/internal/types';
import DevelopmentTable from "../.storybook/components/DevelopmentTable.vue";


const meta = {
  title: 'Forms Builder',
  component: DevelopmentTable,
  argTypes: {
    modelValue: {control: "object", description: "Schema u"},
  } as Partial<ArgTypes<any>>,
  args: {},
} satisfies Meta<typeof DevelopmentTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    workspaceId: "bm",
    modelValue: {"type":"object","properties":{"requestedSchedule":{"label":"","layout":{"fillRow":true,"component":"scheduler-grid"},"legend":[{"statusKey":"PRESENT","label":"In Office","colors":{"light":"#C8E6C9","dark":"#1B5E20"}},{"statusKey":"WFH","label":"Work From Home","colors":{"light":"#BBDEFB","dark":"#0D47A1"}},{"statusKey":"PTO","label":"Paid Time Off","colors":{"light":"#FFE082","dark":"#E65100"}},{"statusKey":"SICK","label":"Sick Leave","colors":{"light":"#FFCDD2","dark":"#B71C1C"}},{"statusKey":"WEEKEND","label":"Weekend","colors":{"light":"#EEEEEE","dark":"#121212"}},{"statusKey":"HOLIDAY","label":"Public Holiday","colors":{"light":"#E1BEE7","dark":"#4A148C"}},{"statusKey":"HALF_DAY","label":"Part Time","colors":{"light":"#FFCC80","dark":"#BF360C"}}]},"alert131":{"memorable":false,"content":"Proszę sprawdzić dane w powyższym harmonogramie i nanieść ewentualne poprawki.","layout":{"component":"alert","props":{"variant":"flat","type":"info","density":"compact"}}}}}
  }
}

export const Story1: Story = {
  args: {
    workspaceId: "bm",
    modelValue: {
      "type": "object",
      "properties": {
        "tableView351": {
          "layout": {"component": "table-view"},
          "source": {
            "data": "",
            "headers": [{"title": "Change me"}, {"title": "Change me"}, {"title": "Change me"}],
            "buttons": []
          },
          "actions": {}
        }
      }
    }
  }
}

export const FormBuilderEmpty: Story = {
  args: {
    workspaceId: "bm",
    modelValue: {
      "type": "object", "properties": {
        "textField791": {
          "label": "Item-textField791",
          "layout": {
            "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
            "fillRow": true,
            "component": "text-field"
          }
        },
        "duplicatedSection257": {
          "layout": {
            "component": "duplicated-section",
            "schema": {
              "type": "object",
              "properties": {
                "textField441": {
                  "label": "Item-textField441",
                  "layout": {
                    "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
                    "fillRow": true,
                    "component": "text-field"
                  }
                },
                "fieldsGroup668": {
                  "layout": {
                    "component": "fields-group",
                    "schema": {
                      "type": "object",
                      "properties": {
                        "textField196": {
                          "label": "Item-textField196",
                          "layout": {
                            "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
                            "fillRow": true,
                            "component": "text-field"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "options": {
              "addBtnText": "Add element",
              "showDivider": false,
              "ordinalNumberInModel": false,
              "showFirstInitRow": true
            }
          }, "editable": true, "showElements": true
        },
        "duplicatedSection359": {
          "layout": {
            "component": "duplicated-section",
            "schema": {
              "type": "object",
              "properties": {
                "duplicatedSection796": {
                  "layout": {
                    "component": "duplicated-section",
                    "schema": {
                      "type": "object",
                      "properties": {
                        "textField511": {
                          "label": "Item-textField511",
                          "layout": {
                            "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
                            "fillRow": true,
                            "component": "text-field"
                          }
                        },
                        "fieldsGroup781": {
                          "layout": {
                            "component": "fields-group",
                            "schema": {
                              "type": "object",
                              "properties": {
                                "textField499": {
                                  "label": "Item-textField499",
                                  "layout": {
                                    "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
                                    "fillRow": true,
                                    "component": "text-field"
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "options": {
                      "addBtnText": "Add element",
                      "showDivider": false,
                      "ordinalNumberInModel": false,
                      "showFirstInitRow": true
                    }
                  }, "editable": true, "showElements": true
                }
              }
            },
            "options": {
              "addBtnText": "Add element",
              "showDivider": false,
              "ordinalNumberInModel": false,
              "showFirstInitRow": true
            }
          }, "editable": true, "showElements": true
        },
        "fieldsGroup873": {
          "layout": {
            "component": "fields-group",
            "schema": {
              "type": "object",
              "properties": {
                "fieldsGroup619": {
                  "layout": {
                    "component": "fields-group",
                    "schema": {
                      "type": "object",
                      "properties": {
                        "textField009": {
                          "label": "Item-textField009",
                          "layout": {
                            "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
                            "fillRow": true,
                            "component": "text-field"
                          }
                        }
                      }
                    }
                  }
                },
                "textField956": {
                  "label": "Item-textField956",
                  "layout": {
                    "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
                    "fillRow": true,
                    "component": "text-field"
                  }
                },
                "duplicatedSection388": {
                  "layout": {
                    "component": "duplicated-section",
                    "schema": {
                      "type": "object",
                      "properties": {
                        "textField391": {
                          "label": "Item-textField391",
                          "layout": {
                            "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
                            "fillRow": true,
                            "component": "text-field"
                          }
                        }
                      }
                    },
                    "options": {
                      "addBtnText": "Add element",
                      "showDivider": false,
                      "ordinalNumberInModel": false,
                      "showFirstInitRow": true
                    }
                  }, "editable": true, "showElements": true
                }
              }
            }
          }
        }
      }
    }
  }
}

export const MCK: Story = {
  args: {
    workspaceId: "bm",
    modelValue: {
      "type": "object", "properties": {
        "static-content-main-title": {
          "content": "Wniosek urlopowy nr {numberRequest: -}",
          "layout": {"tag": "h1", "component": "static-content"}
        },
        "static-content-requestor-details": {
          "content": "<i class=\"mdi mdi-account-edit-outline mr-2\"></i>Dane wnioskującego o urlop",
          "layout": {"tag": "h2", "component": "static-content"}
        },
        "staticContent265": {
          "content": "<div class=\"v-card v-sheet elevation-3 rounded-lg pa-4 mb-4\" style=\"flex: 1 1 48%; min-width: 300px; margin-right: 16px;\">\n    \n    <div class=\"v-card-text pa-0\">\n        \n        <h3 class=\"subtitle-1 font-weight-bold mb-3 d-flex align-center\">\n            <i class=\"mdi mdi-clipboard-text-multiple-outline mr-2 info--text\"></i>\n            Dane Rejestracyjne\n        </h3>\n        \n        <div class=\"d-flex flex-wrap align-stretch justify-space-between\">\n            \n            <div class=\"pa-3 rounded-lg mb-3 mr-sm-2 blue lighten-5\" style=\"flex: 1 1 30%; min-width: 150px;\">\n                <p class=\"mb-0 text-caption font-weight-medium info--text text--darken-2\">Data Rejestracji</p>\n                <div class=\"title font-weight-bold info--text text--darken-4\">\n                    {registrationDate: Brak Danych}\n                </div>\n            </div>\n\n            <div class=\"pa-3 rounded-lg mb-3 mr-sm-2 blue lighten-5\" style=\"flex: 1 1 30%; min-width: 150px;\">\n                <p class=\"mb-0 text-caption font-weight-medium info--text text--darken-2\">Miasto Rejestracji</p>\n                <div class=\"title font-weight-bold info--text text--darken-4\">\n                    {registrationCity: Brak Danych}\n                </div>\n            </div>\n            \n            <div class=\"pa-3 rounded-lg mb-3 blue lighten-5\" style=\"flex: 1 1 30%; min-width: 150px;\">\n                <p class=\"mb-0 text-caption font-weight-medium info--text text--darken-2\">Wnioskujący</p>\n                <div class=\"title font-weight-bold info--text text--darken-4\">\n                    {author.firstName: } {author.lastName: Brak danych}\n                </div>\n            </div>\n            \n        </div>\n    </div>\n</div>",
          "layout": {"tag": "span", "component": "static-content"}
        },
        "info-employee": {
          "content": "<div class=\"v-card v-sheet elevation-3 rounded-lg pa-4 mb-4\" style=\"flex: 1 1 48%; min-width: 300px; margin-right: 16px;\">\n    \n    <div class=\"v-card-text pa-0\">\n        \n        <h3 class=\"subtitle-1 font-weight-bold mb-3 d-flex align-center\">\n            <i class=\"mdi mdi-account-details mr-2 info--text\"></i>\n            Dane Pracownika\n        </h3>\n        \n        <div class=\"d-flex flex-wrap align-stretch justify-space-between\">\n            \n            <div class=\"pa-3 rounded-lg mb-3 mr-sm-2 blue lighten-5\" style=\"flex: 1 1 30%; min-width: 150px;\">\n                <p class=\"mb-0 text-caption font-weight-medium info--text text--darken-2\">Imię</p>\n                <div class=\"title font-weight-bold info--text text--darken-4\">\n                    {employee.firstName: Brak Danych}\n                </div>\n            </div>\n\n            <div class=\"pa-3 rounded-lg mb-3 mr-sm-2 blue lighten-5\" style=\"flex: 1 1 30%; min-width: 150px;\">\n                <p class=\"mb-0 text-caption font-weight-medium info--text text--darken-2\">Nazwisko</p>\n                <div class=\"title font-weight-bold info--text text--darken-4\">\n                    {employee.lastName: Brak Danych}\n                </div>\n            </div>\n            \n            <div class=\"pa-3 rounded-lg mb-3 blue lighten-5\" style=\"flex: 1 1 30%; min-width: 150px;\">\n                <p class=\"mb-0 text-caption font-weight-medium info--text text--darken-2\">Dział</p>\n                <div class=\"title font-weight-bold info--text text--darken-4\">\n                    {employee.department: Brak Danych}\n                </div>\n            </div>\n\n            <div class=\"pa-3 rounded-lg mb-3 mr-sm-2 blue lighten-5\" style=\"flex: 1 1 30%; min-width: 150px;\">\n                <p class=\"mb-0 text-caption font-weight-medium info--text text--darken-2\">Przełożony</p>\n                <div class=\"title font-weight-bold info--text text--darken-4\">\n                    {employee.manager.fullname: Brak Danych}\n                </div>\n            </div>\n\n            <div class=\"pa-3 rounded-lg mb-3 blue lighten-5\" style=\"flex: 1 1 30%; min-width: 150px;\">\n                <p class=\"mb-0 text-caption font-weight-medium info--text text--darken-2\">Wymiar Etatu</p>\n                <div class=\"title font-weight-bold info--text text--darken-4\">\n                    {employee.fulltime: Brak Danych}\n                </div>\n            </div>\n            \n            </div>\n    </div>\n</div>",
          "layout": {"tag": "span", "component": "static-content", "if": ""}
        },
        "static-content-holiday-details": {
          "content": "<i class=\"mdi mdi-calendar-check-outline mr-2\"></i>Rodzaj niebecnośći: {typeAbsence.name: Brak danych}",
          "layout": {"tag": "h2", "component": "static-content"}
        },
        "occasionalLeave": {
          "layout": {
            "component": "fields-group", "schema": {
              "type": "object", "properties": {
                "specialLeaveType": {
                  "label": "Rodzaj okoliczności",
                  "layout": {"component": "radio-button"},
                  "source": {
                    "items": [{
                      "value": "immediateFamilyDeath",
                      "title": "W razie zgonu i pogrzebu: małżonka, dziecka, ojca, matki, ojczyma lub macochy pracownika",
                      "isReference": false
                    }, {
                      "value": "extendedFamilyDeath",
                      "title": "W razie zgonu i pogrzebu siostry, brata, teściowej, teścia, babci, dziadka pracownika a także innej osoby pozostającej na utrzymaniu pracownika lub pod jego bezpośrednią opieką."
                    }], "returnObject": true
                  }
                },
                "immediateFamilyDeathType": {
                  "label": "Pokrewieństwo",
                  "layout": {
                    "component": "radio-button",
                    "if": "nata(specialLeaveType.value = \"immediateFamilyDeath\")"
                  },
                  "source": {
                    "items": [{"value": "spouse", "title": "małżonek"}, {
                      "value": "child",
                      "title": "dziecko"
                    }, {"value": "father", "title": "ojciec"}, {
                      "value": "mother",
                      "title": "matka"
                    }, {"value": "stepFatherhangeMe", "title": "ojczym"}, {"value": "stepMother", "title": "macocha"}],
                    "returnObject": true
                  }
                },
                "extendedFamilyDeathType": {
                  "label": "Pokrewieństwo",
                  "layout": {
                    "component": "radio-button",
                    "if": "nata(specialLeaveType.value = \"extendedFamilyDeath\")"
                  },
                  "source": {
                    "items": [{"value": "sister", "title": "siostra"}, {
                      "value": "brother",
                      "title": "brat"
                    }, {"value": "motherInLaw", "title": "teściowa"}, {
                      "value": "fatherInLaw",
                      "title": "teść"
                    }, {"value": "grandmother", "title": "babcia"}, {
                      "value": "grandfather",
                      "title": "dziadek"
                    }, {
                      "value": "otherDependent",
                      "title": "inna osoba pozostająca na moim bezpośrednim utrzymaniu lub bezpośrednią opieką"
                    }], "returnObject": true
                  }
                },
                "commitToPresentDocument": {
                  "label": "Zobowiązuję się do okazania odpowiedniego aktu w Dziale Kadr",
                  "layout": {"component": "switch"}
                }
              }, "required": ["specialLeaveType", "immediateFamilyDeathType", "extendedFamilyDeathType"]
            }, "options": {"showDivider": false, "addBtnText": "Add"}
          }
        },
        "statutoryExtraLeave": {
          "layout": {
            "component": "fields-group", "schema": {
              "type": "object",
              "properties": {
                "extraLeavePurpose": {
                  "label": "Powód dodatkowego urlopu",
                  "layout": {"component": "radio-button"},
                  "source": {
                    "items": [{
                      "value": "examsExternalProf",
                      "title": "Pracownik przystępuje do egzaminów eksternistycznych, do egzaminu maturalnego lub do egzaminu potwierdzającego kwalifikacje zawodowe",
                      "isReference": false
                    }, {
                      "value": "finalYearThesisExam",
                      "title": "Pracownik przystępuje w ostatnim roku studiów, na przygotowanie pracy dyplomowej oraz przygotowanie się i przystąpienie do egzaminu dyplomowego",
                      "isReference": false
                    }, {"value": "unpaidLeave", "title": "Urlop bezpłatny"}, {
                      "value": "paidElectionLeave",
                      "title": "Dzień/dni wolny/e z tytułu pracy w komisji wyborczej"
                    }, {
                      "value": "unpaidElectionLeave",
                      "title": "Dzień/dni wolny/e bezpłatny/e z tytułu pracy w komisji wyborczej"
                    }, {"value": "forceMajeureLeave", "title": "Z powodu siły wyższej"}, {
                      "value": "caregiverLeave",
                      "title": "Urlop opiekuńczy"
                    }, {"value": "other", "title": "Inny"}], "returnObject": true
                  }
                },
                "alertForceMajeureLeave": {
                  "memorable": false,
                  "content": "W okresie urlopu z powodu siły wyższej zachowane jest prawo do połowy wynagrodzenia za czas nieobecności",
                  "layout": {"component": "alert", "props": {"type": "warning"}}
                },
                "commitToPresentElectionCert": {
                  "label": "Zobowiązuje się do okazania zaświadczenia z Komisji Wyborczej w Dziale Kadr",
                  "layout": {"component": "switch"}
                },
                "careRecipientType": {
                  "label": "Rodzaj opieki",
                  "layout": {"component": "radio-button"},
                  "source": {
                    "items": [{"value": "family", "title": "Członek rodziny"}, {
                      "value": "household",
                      "title": "Osoba zamieszkująca w tym samym gospodarstwie domowym"
                    }]
                  }
                },
                "careRecipientName": {
                  "label": "Imię i Nazwisko osoby, której dotyczy opieka",
                  "layout": {"component": "text-field"}
                },
                "relationshipType": {
                  "label": "Rodzaj pokrewieństwa",
                  "layout": {
                    "component": "radio-button",
                    "if": "nata(specialLeaveType.value = \"immediateFamilyDeath\")"
                  },
                  "source": {
                    "items": [{"value": "spouse", "title": "małżonek"}, {
                      "value": "child",
                      "title": "dziecko"
                    }, {"value": "father", "title": "ojciec"}, {
                      "value": "mother",
                      "title": "matka"
                    }, {"value": "stepFatherhangeMe", "title": "ojczym"}, {"value": "stepMother", "title": "macocha"}],
                    "returnObject": true
                  }
                },
                "householderAddress": {"label": "Adres", "layout": {"component": "address"}},
                "otherLeaveReasonDetails": {
                  "label": "Uzasadnienie",
                  "layout": {"component": "text-area", "if": "nata(extraLeavePurpose.value = \"other\")"}
                }
              },
              "required": ["extraLeavePurpose", "careRecipientType", "careRecipientName", "relationshipType", "otherLeaveReasonDetails"]
            }, "options": {"showDivider": false, "addBtnText": "Add"}
          }
        },
        "childCareLeave14KP": {
          "layout": {
            "component": "fields-group",
            "schema": {
              "type": "object",
              "properties": {
                "childDateOfBirth": {
                  "label": "Data urodzenia dziecka",
                  "layout": {"component": "date-picker"}
                }
              },
              "required": ["childDateOfBirth"]
            },
            "options": {"showDivider": false, "addBtnText": "Add"}
          }
        },
        "compensatoryDayOff": {
          "layout": {
            "component": "fields-group",
            "schema": {
              "type": "object",
              "properties": {"workDate": {"label": "Przepracowany dzień", "layout": {"component": "date-picker"}}}
            },
            "options": {"showDivider": false, "addBtnText": "Add"}
          }
        },
        "remoteWorkRequest": {
          "layout": {
            "component": "fields-group", "schema": {
              "type": "object", "properties": {
                "remoteWorkSummary": {
                  "content": "Informacje o okazjonalnej pracy zdalnej za rok XXX<br>Limit\tLiczba \t\tPole uzupełnianie automatycznie wartością przysługujących dni pracy zdalnej\tPole widoczne, jeśli w polu „Rodzaj nieobecności” wybrano opcję „Wniosek o pracę zdalną okazjonalną”\nWykorzystano\tLiczba\t\tPole uzupełniane automatycznie wartością wykorzystanych dni pracy zdalnej\tPole widoczne, jeśli w polu „Rodzaj nieobecności” wybrano opcję „Wniosek o pracę zdalną”\nPozostało\tLiczba \t\tPole uzupełniane automatycznie wartością pozostałych dni pracy zdalnej możliwych do wykorzystania\tPole widoczne, jeśli w polu „Rodzaj nieobecności” wybrano opcję „Wniosek o pracę zdalną”\n",
                  "layout": {"tag": "span", "component": "static-content"}
                },
                "remoteWorkType": {
                  "label": "Rodzaj pracy zdalnej",
                  "layout": {"component": "radio-button"},
                  "source": {
                    "items": [{"value": "fullyRemote", "title": "Praca zdalna"}, {
                      "value": "occasionalRemote",
                      "title": "Praca zdalna okazjonalna"
                    }]
                  }
                },
                "remoteWorkAddress": {"label": "remoteWorkAddress", "layout": {"component": "address"}},
                "remoteWorkMandatoryRules": {
                  "label": "Regulamin",
                  "layout": {"component": "checkbox", "props": {"multiple": true}},
                  "source": {
                    "items": [{
                      "value": 1,
                      "title": "Oświadczam, że we wskazanym miejscu są zapewnione bezpieczne i higieniczne warunki pracy",
                      "disabledCondition": "changeMe"
                    }, {
                      "value": 2,
                      "title": "Oświadczam, że zapoznałem/am się z Regulaminem Pracy Zdalnej, „Oceną ryzyka zawodowego” oraz „Informacją zawierającą zasady bezpiecznego i higienicznego wykonywania pracy zdalnej.”"
                    }]
                  }
                },
                "infoRemoteWorkExtDocs": {
                  "memorable": false,
                  "content": "Dokumenty MCK dotyczące pracy zdalnej \n<br>\nLink przenosi do Bazy Wiedzy, gdzie znajdują się: Regulamin Pracy Zdalnej, „Ocena ryzyka zawodowego” oraz „Informacja zawierającą zasady bezpiecznego i higienicznego wykonywania pracy zdalnej.”",
                  "layout": {"component": "alert", "props": {"type": "info"}}
                }
              }, "required": ["remoteWorkType", "remoteWorkMandatoryRules"]
            }, "options": {"showDivider": false, "addBtnText": "Add"}
          }
        },
        "absencePeriods": {
          "layout": {
            "component": "duplicated-section",
            "schema": {
              "type": "object",
              "properties": {
                "specifiedDate": {"label": "Data", "layout": {"component": "date-picker"}},
                "startDate": {
                  "label": "Od",
                  "layout": {
                    "cols": {"xs": 6, "sm": 6, "md": 6, "lg": 6, "xl": 6, "xxl": 6},
                    "component": "date-picker"
                  }
                },
                "EndDate": {
                  "label": "Do",
                  "layout": {
                    "cols": {"xs": 6, "sm": 6, "md": 6, "lg": 6, "xl": 6, "xxl": 6},
                    "component": "date-picker"
                  }
                },
                "startDateTime": {
                  "label": "Nieobecność od",
                  "layout": {
                    "component": "date-time-picker",
                    "cols": {"xs": 6, "sm": 6, "md": 6, "lg": 6, "xl": 6, "xxl": 6}
                  }
                },
                "endDateTime": {
                  "label": "Nieobecność do",
                  "layout": {
                    "component": "date-time-picker",
                    "cols": {"xs": 6, "sm": 6, "md": 6, "lg": 6, "xl": 6, "xxl": 6}
                  }
                },
                "staticContent977": {"content": "Change it", "layout": {"tag": "span", "component": "static-content"}}
              }
            },
            "options": {
              "addBtnText": "Dodaj okres",
              "showDivider": true,
              "ordinalNumberInModel": true,
              "showFirstInitRow": false
            }
          }, "editable": true, "showElements": true
        },
        "compensationCommitmentDays": {
          "layout": {
            "component": "duplicated-section",
            "schema": {
              "type": "object",
              "properties": {
                "startDateTime": {
                  "label": "Odpracowanie od",
                  "layout": {
                    "component": "date-time-picker",
                    "cols": {"xs": 6, "sm": 6, "md": 6, "lg": 6, "xl": 6, "xxl": 6}
                  }
                },
                "endDateTime": {
                  "label": "Odpracowanie do",
                  "layout": {
                    "component": "date-time-picker",
                    "cols": {"xs": 6, "sm": 6, "md": 6, "lg": 6, "xl": 6, "xxl": 6}
                  }
                }
              }
            },
            "options": {
              "addBtnText": "Dodaj okres",
              "showDivider": false,
              "ordinalNumberInModel": false,
              "showFirstInitRow": true
            }
          }, "editable": true, "showElements": true
        },
        "static-content-holiday-acceptance": {
          "content": "<i class=\"mdi mdi-account-check-outline mr-2\"></i> Akceptacja zastępstwa",
          "layout": {"tag": "h2", "component": "static-content"}
        },
        "info-task": {
          "memorable": true,
          "content": "<div>\n    <h3 class=\"font-weight-bold mb-2\">Akceptacja Zastępstwa Urlopowego</h3>\n    \n    <p>Twoim zadaniem jest <b>analiza kalendarza, weryfikacja realnych możliwości oraz dostępności zasobów</b>, aby świadomie podjąć się roli zastępcy we wskazanym okresie. Twoja decyzja jest kluczowa dla dalszego obiegu Wniosku Urlopowego.</p>\n    \n    <h4 class=\"title mt-3 mb-2 success--text\">Kluczowe Wymagania dotyczące Weryfikacji Zastępstwa:</h4>\n    \n    <ul class=\"v-list my-2 rounded-lg pa-2 grey lighten-5\">\n        <li class=\"v-list-item pa-0\">\n            <i class=\"mdi mdi-calendar-clock-outline mr-2 success--text\"></i>\n            <span>Sprawdź swój kalendarz i <b>potwierdź, że nie koliduje</b> on z datami absencji wnioskującego.</span>\n        </li>\n        <li class=\"v-list-item pa-0\">\n            <i class=\"mdi mdi-account-cog-outline mr-2 success--text\"></i>\n            <span>Przeanalizuj, czy posiadasz <b>wiedzę i możliwości</b> na przejęcie kluczowych obowiązków w czasie nieobecności.</span>\n        </li>\n        <li class=\"v-list-item pa-0\">\n            <i class=\"mdi mdi-account-check-outline mr-2 success--text\"></i>\n            <span>Ostatecznie <b>potwierdź gotowość</b> do podjęcia się roli Zastępcy w zakresie wymagań Działu/Projektu.</span>\n        </li>\n    </ul>\n\n    <h4 class=\"title mt-4 mb-2\">Dostępne Opcje Decyzyjne:</h4>\n\n    <div class=\"pl-3 py-1 my-2\" style=\"border-left: 4px solid #4CAF50;\">\n        <p class=\"font-weight-bold mb-0\">1. Akceptuj Zastępstwo i Przekaż do Przełożonego</p>\n        <span class=\"caption\">Potwierdzasz możliwość realizacji zastępstwa. Wniosek trafia do <b>bezpośredniego przełożonego pracownika</b>. Komentarz jest opcjonalny.</span>\n    </div>\n    \n    <div class=\"pl-3 py-1 my-2\" style=\"border-left: 4px solid #FF9800;\">\n        <p class=\"font-weight-bold mb-0\">2. Odrzuć Zastępstwo i Odeślij do Poprawy</p>\n        <span class=\"caption\">Nie możesz podjąć się zastępstwa. Wniosek wraca do <b>wnioskującego pracownika do korekty (wyznaczenia innego zastępcy)</b>. <b>Obowiązkowo</b> opisz w komentarzu powód odrzucenia.</span>\n    </div>\n\n    <p class=\"mt-3 font-weight-bold info--text text--darken-4\">\n        Twoja decyzja o akceptacji lub odrzuceniu zastępstwa jest wiążąca i decyduje o ścieżce procedowania wniosku.\n    </p>\n</div>",
          "layout": {"component": "alert", "props": {"type": "info"}}
        },
        "replacementApproval": {
          "label": "",
          "layout": {
            "cols": {"xs": 12, "sm": 6, "md": 6, "lg": 4, "xl": 4, "xxl": 4},
            "fillRow": true,
            "component": "radio-button",
            "props": {"inline": true}
          },
          "source": {"items": [{"value": true, "title": "Akceptuj"}, {"value": false, "title": "Do poprawy"}]}
        }
      }
    }
  }
}

