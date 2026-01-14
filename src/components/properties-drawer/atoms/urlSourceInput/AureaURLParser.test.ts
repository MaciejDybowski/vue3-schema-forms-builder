import {describe, expect, it} from "vitest";
import {buildEncodedUrl, parseUrlToParams} from "./AureaURLlParser";


type Case = { name: string; decoded: string; encoded: string };

const cases: Case[] = [
  {
    name: "label/value",
    decoded: `/api/dictionaries?feature-id=test-feature&lm=label&vm=id`,
    encoded: "/api/dictionaries?feature-id=test-feature&lm=label&vm=id"
  },
  {
    name: "label/value/dm",
    decoded: `/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa: {label}`,
    encoded: "/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa%3A%20%7Blabel%7D"
  },
  {
    name: "label/value/dm/customAttributes",
    decoded: "/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa: {label}&customAttributes=symbol,{symbol},rodzajNazwa,{rodzajNazwa}",
    encoded: "/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa%3A%20%7Blabel%7D&customAttributes=symbol%2C%7Bsymbol%7D%2CrodzajNazwa%2C%7BrodzajNazwa%7D"
  },
  {
    name: "label/value/dm/customAttributes/filter",
    decoded: "/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa: {label}&customAttributes=symbol,{symbol},rodzajNazwa,{rodzajNazwa}&filter=symbol=={zmienna1}",
    encoded: "/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa%3A%20%7Blabel%7D&customAttributes=symbol%2C%7Bsymbol%7D%2CrodzajNazwa%2C%7BrodzajNazwa%7D&filter=symbol%3D%3D{zmienna1}"
  },
  {
    name: "label/value/processId/aureaSectionId",
    decoded: "/api/dictionaries?feature-id=test-feature&lm=nazwa&vm=kod&processId={tech.processId}&aureaSectionId={pozycjeDokumentu[].aureaSectionId}",
    encoded: "/api/dictionaries?feature-id=test-feature&lm=nazwa&vm=kod&processId={tech.processId}&aureaSectionId={pozycjeDokumentu[].aureaSectionId}"
  },
  {
    name: "label/value/value-filter/enable-filter",
    decoded: "/api/dictionaries?feature-id=test-feature&lm=nazwa&vm=kod&value-filter={deps.item.id}&enable-filter=radioButton=1",
    encoded: "/api/dictionaries?feature-id=test-feature&lm=nazwa&vm=kod&value-filter={deps.item.id}&enable-filter=radioButton=1"
  },
  {
    name: "BM attributes",
    decoded: "/api/dictionaries?feature-id=rodzaje-kosztu-pozycji-faktury&lm=nazwa&vm=kod&customAttributes=aktualnieDostepne,{aktualnieDostepne},czyPoleCelSpotkania,{czyPoleCelSpotkania},czyPoleNazwaKlienta,{czyPoleNazwaKlienta},czyPoleLiczbaOsob,{czyPoleLiczbaOsob},czyPoleOpisDokumentu,{czyPoleOpisDokumentu},czyPoleDataPrzyjeciaPrzyjazdu,{czyPoleDataPrzyjeciaPrzyjazdu},czyPoleAkronim,{czyPoleAkronim},czyPoleNrRejestracyjny,{czyPoleNrRejestracyjny},czyPoleNosnik,{czyPoleNosnik},czyPoleRodzinaEl4,{czyPoleRodzinaEl4},czyPoleRodzinaEl5,{czyPoleRodzinaEl5},czyPoleDealDbs,{czyPoleDealDbs},czyPoleNrProjektu,{czyPoleNrProjektu},czyPoleNrZleceniaSerwisowegoDbs,{czyPoleNrZleceniaSerwisowegoDbs},czyPoleOsobaDoRefaktury,{czyPoleOsobaDoRefaktury},czyPowiadomicDzialZakupow,{czyPowiadomicDzialZakupow},powiadomienieDzialZakupowProgKowtyPln,{powiadomienieDzialZakupowProgKowtyPln}&filter=aktualnieDostepne==true",
    encoded: "/api/dictionaries?feature-id=rodzaje-kosztu-pozycji-faktury&lm=nazwa&vm=kod&customAttributes=aktualnieDostepne%2C%7BaktualnieDostepne%7D%2CczyPoleCelSpotkania%2C%7BczyPoleCelSpotkania%7D%2CczyPoleNazwaKlienta%2C%7BczyPoleNazwaKlienta%7D%2CczyPoleLiczbaOsob%2C%7BczyPoleLiczbaOsob%7D%2CczyPoleOpisDokumentu%2C%7BczyPoleOpisDokumentu%7D%2CczyPoleDataPrzyjeciaPrzyjazdu%2C%7BczyPoleDataPrzyjeciaPrzyjazdu%7D%2CczyPoleAkronim%2C%7BczyPoleAkronim%7D%2CczyPoleNrRejestracyjny%2C%7BczyPoleNrRejestracyjny%7D%2CczyPoleNosnik%2C%7BczyPoleNosnik%7D%2CczyPoleRodzinaEl4%2C%7BczyPoleRodzinaEl4%7D%2CczyPoleRodzinaEl5%2C%7BczyPoleRodzinaEl5%7D%2CczyPoleDealDbs%2C%7BczyPoleDealDbs%7D%2CczyPoleNrProjektu%2C%7BczyPoleNrProjektu%7D%2CczyPoleNrZleceniaSerwisowegoDbs%2C%7BczyPoleNrZleceniaSerwisowegoDbs%7D%2CczyPoleOsobaDoRefaktury%2C%7BczyPoleOsobaDoRefaktury%7D%2CczyPowiadomicDzialZakupow%2C%7BczyPowiadomicDzialZakupow%7D%2CpowiadomienieDzialZakupowProgKowtyPln%2C%7BpowiadomienieDzialZakupowProgKowtyPln%7D&filter=aktualnieDostepne%3D%3Dtrue"
  },
  {
    name: "Expression with != and '' ",
    decoded: `/api/dictionaries?feature-id=rodzaje-kosztu-pozycji-faktury&lm=nazwa&vm=kod&customAttributes=labels,expression:aureaSectionId != null ? "bm-ai-prediction" : ""`,
    encoded: "/api/dictionaries?feature-id=rodzaje-kosztu-pozycji-faktury&lm=nazwa&vm=kod&customAttributes=labels%2Cexpression%3AaureaSectionId%20%21%3D%20null%20%3F%20%22bm-ai-prediction%22%20%3A%20%22%22"
  },
  {
    name: "BM master słownik",
    decoded: "/api/dictionaries?feature-id=rodzaje-kosztu-pozycji-faktury&lm=nazwa&vm=kod&processId={tech.processId}&aureaSectionId={pozycjeDokumentu[].aureaSectionId}&customAttributes=aktualnieDostepne,{aktualnieDostepne},czyPoleCelSpotkania,{czyPoleCelSpotkania},czyPoleNazwaKlienta,{czyPoleNazwaKlienta},czyPoleLiczbaOsob,{czyPoleLiczbaOsob},czyPoleOpisDokumentu,{czyPoleOpisDokumentu},czyPoleDataPrzyjeciaPrzyjazdu,{czyPoleDataPrzyjeciaPrzyjazdu},czyPoleAkronim,{czyPoleAkronim},czyPoleNrRejestracyjny,{czyPoleNrRejestracyjny},czyPoleNosnik,{czyPoleNosnik},czyPoleRodzinaEl4,{czyPoleRodzinaEl4},czyPoleRodzinaEl5,{czyPoleRodzinaEl5},czyPoleDealDbs,{czyPoleDealDbs},czyPoleNrProjektu,{czyPoleNrProjektu},czyPoleNrZleceniaSerwisowegoDbs,{czyPoleNrZleceniaSerwisowegoDbs},czyPoleOsobaDoRefaktury,{czyPoleOsobaDoRefaktury},czyPowiadomicDzialZakupow,{czyPowiadomicDzialZakupow},powiadomienieDzialZakupowProgKowtyPln,{powiadomienieDzialZakupowProgKowtyPln},labels,expression:aureaSectionId != null ? \"bm-ai-prediction\" : \"\"&filter=aktualnieDostepne==true",
    encoded: "/api/dictionaries?feature-id=rodzaje-kosztu-pozycji-faktury&lm=nazwa&vm=kod&processId={tech.processId}&aureaSectionId={pozycjeDokumentu[].aureaSectionId}&customAttributes=aktualnieDostepne%2C%7BaktualnieDostepne%7D%2CczyPoleCelSpotkania%2C%7BczyPoleCelSpotkania%7D%2CczyPoleNazwaKlienta%2C%7BczyPoleNazwaKlienta%7D%2CczyPoleLiczbaOsob%2C%7BczyPoleLiczbaOsob%7D%2CczyPoleOpisDokumentu%2C%7BczyPoleOpisDokumentu%7D%2CczyPoleDataPrzyjeciaPrzyjazdu%2C%7BczyPoleDataPrzyjeciaPrzyjazdu%7D%2CczyPoleAkronim%2C%7BczyPoleAkronim%7D%2CczyPoleNrRejestracyjny%2C%7BczyPoleNrRejestracyjny%7D%2CczyPoleNosnik%2C%7BczyPoleNosnik%7D%2CczyPoleRodzinaEl4%2C%7BczyPoleRodzinaEl4%7D%2CczyPoleRodzinaEl5%2C%7BczyPoleRodzinaEl5%7D%2CczyPoleDealDbs%2C%7BczyPoleDealDbs%7D%2CczyPoleNrProjektu%2C%7BczyPoleNrProjektu%7D%2CczyPoleNrZleceniaSerwisowegoDbs%2C%7BczyPoleNrZleceniaSerwisowegoDbs%7D%2CczyPoleOsobaDoRefaktury%2C%7BczyPoleOsobaDoRefaktury%7D%2CczyPowiadomicDzialZakupow%2C%7BczyPowiadomicDzialZakupow%7D%2CpowiadomienieDzialZakupowProgKowtyPln%2C%7BpowiadomienieDzialZakupowProgKowtyPln%7D%2Clabels%2Cexpression%3AaureaSectionId%20%21%3D%20null%20%3F%20%22bm-ai-prediction%22%20%3A%20%22%22&filter=aktualnieDostepne%3D%3Dtrue"
  },
  {
    name: "label/value/dm/customAttributes",
    decoded: "/api/dictionaries?feature-id=incoterm-rules&lm=name&vm=dataId&dm={name}&customAttributes=transportRateEditable,{transportRateEditable}",
    encoded: "/api/dictionaries?feature-id=incoterm-rules&lm=name&vm=dataId&dm=%7Bname%7D&customAttributes=transportRateEditable%2C%7BtransportRateEditable%7D"
  },
  {
    name: "BFG ex1",
    decoded: "/api/dictionaries?feature-id=slownik-lokalizacji-delegacji&lm=nazwa&vm=kodKraju&customAttributes=kwotaDiety,{kwotaDiety},limitNoclegu,{limitNoclegu},kwotaRyczaltDojazd,{kalkulacja.kwotaRyczaltDojazd},kwotaRyczaltNocleg,{kalkulacja.kwotaRyczaltNocleg},kwotaOdliczenieSniadanie,{kalkulacja.kwotaOdliczenieSniadanie},kwotaOdliczenieObiad,{kalkulacja.kwotaOdliczenieObiad},kwotaOdliczenieKolacja,{kalkulacja.kwotaOdliczenieKolacja},kodWaluty,{kodWaluty}",
    encoded: "/api/dictionaries?feature-id=slownik-lokalizacji-delegacji&lm=nazwa&vm=kodKraju&customAttributes=kwotaDiety%2C%7BkwotaDiety%7D%2ClimitNoclegu%2C%7BlimitNoclegu%7D%2CkwotaRyczaltDojazd%2C%7Bkalkulacja.kwotaRyczaltDojazd%7D%2CkwotaRyczaltNocleg%2C%7Bkalkulacja.kwotaRyczaltNocleg%7D%2CkwotaOdliczenieSniadanie%2C%7Bkalkulacja.kwotaOdliczenieSniadanie%7D%2CkwotaOdliczenieObiad%2C%7Bkalkulacja.kwotaOdliczenieObiad%7D%2CkwotaOdliczenieKolacja%2C%7Bkalkulacja.kwotaOdliczenieKolacja%7D%2CkodWaluty%2C%7BkodWaluty%7D"
  },
  {
    name: "BFG ex2",
    decoded: "/api/dictionaries?feature-id=slownik-srodkow-transportu&lm=nazwa&vm=kod&customAttributes=czyWymagaKilometrowki,{czyWymagaKilometrowki}",
    encoded: "/api/dictionaries?feature-id=slownik-srodkow-transportu&lm=nazwa&vm=kod&customAttributes=czyWymagaKilometrowki%2C%7BczyWymagaKilometrowki%7D"
  },
  {
    name: "repeated customAttributes keys (mixed)",
    decoded: `/api/dictionaries?feature-id=test-feature&lm=label&vm=id&customAttributes=symbol,{symbol}&customAttributes=labels,expression:aureaSectionId != null ? "bm-ai-prediction" : ""`,
    encoded: "/api/dictionaries?feature-id=test-feature&lm=label&vm=id&customAttributes=symbol%2C%7Bsymbol%7D%2Clabels%2Cexpression%3AaureaSectionId%20%21%3D%20null%20%3F%20%22bm-ai-prediction%22%20%3A%20%22%22"
  },
  {
    name:"Forte user case",
    decoded: `/api/dictionaries?feature-id=customer-sales-manager-directors&lm=salesDirectorFullName&vm=salesDirector.id&customAttributes=username,{salesDirector.username},firstName,{salesDirector.firstName},lastName,{salesDirector.lastName},email,{salesDirector.emaill}&filter=customer.id=={customer.customerId};id.salesManagerUsername==^{offer.owner.username}`,
    encoded: `/api/dictionaries?feature-id=customer-sales-manager-directors&lm=salesDirectorFullName&vm=salesDirector.id&customAttributes=username%2C%7BsalesDirector.username%7D%2CfirstName%2C%7BsalesDirector.firstName%7D%2ClastName%2C%7BsalesDirector.lastName%7D%2Cemail%2C%7BsalesDirector.emaill%7D&filter=customer.id%3D%3D{customer.customerId}%3Bid.salesManagerUsername%3D%3D%5E{offer.owner.username}`
  },
  {
    name: "URL with no params",
    decoded: `/api/workspaces/members`,
    encoded: `/api/workspaces/members`,
  },
  {
    name: "Unknown params",
    decoded: `/api/v1/tests&foo=1&bar=test`,
    encoded: `/api/v1/tests&foo=1&bar=test`,
  }

];

describe("AureaURLParser", () => {
  cases.forEach((c) => {
    it(`Case: ${c.name}`, () => {
      const parsed = parseUrlToParams(c.decoded);
      const result = buildEncodedUrl(c.decoded, parsed);
      expect(result).toBe(c.encoded);
    });
  });
});

