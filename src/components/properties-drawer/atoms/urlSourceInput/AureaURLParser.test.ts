import {describe, expect, it} from "vitest";
import {buildEncodedUrl, parseUrlToParams} from "./AureaURLlParser";

describe("AureaURLParser - pełny cykl encode/decode", () => {
  it("Case: label/value", () => {

    const decoded = `/api/dictionaries?feature-id=test-feature&lm=label&vm=id`
    const encoded = "/api/dictionaries?feature-id=test-feature&lm=label&vm=id";

    const parsed = parseUrlToParams(decoded);
    const result = buildEncodedUrl(parsed);

    expect(result).toBe(encoded);
  });

  it("Case: label/value/dm", () => {

    const decoded = `/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa: {label}`
    const encoded = "/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa%3A%20%7Blabel%7D";

    const parsed = parseUrlToParams(decoded);
    const result = buildEncodedUrl(parsed);

    expect(result).toBe(encoded);
  });

  it("Case: label/value/dm/customAttributes", () => {

    const decoded = `/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa: {label}&customAttributes=symbol,{symbol},rodzajNazwa,{rodzajNazwa}`
    const encoded = "/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa%3A%20%7Blabel%7D&customAttributes=symbol%2C%7Bsymbol%7D%2CrodzajNazwa%2C%7BrodzajNazwa%7D";

    const parsed = parseUrlToParams(decoded);
    const result = buildEncodedUrl(parsed);

    expect(result).toBe(encoded);
  });

  it("Case: label/value/dm/customAttributes/filter", () => {

    const decoded = `/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa: {label}&customAttributes=symbol,{symbol},rodzajNazwa,{rodzajNazwa}&filter=symbol=={zmienna1}`
    const encoded = "/api/dictionaries?feature-id=test-feature&lm=label&vm=id&dm=Nazwa%3A%20%7Blabel%7D&customAttributes=symbol%2C%7Bsymbol%7D%2CrodzajNazwa%2C%7BrodzajNazwa%7D&filter=symbol%3D%3D{zmienna1}";

    const parsed = parseUrlToParams(decoded);
    const result = buildEncodedUrl(parsed);

    expect(result).toBe(encoded);
  });


  it("Case: label/value/processId/aureaSectionId", () => {

    const decoded = `/api/dictionaries?feature-id=test-feature&lm=nazwa&vm=kod&processId={tech.processId}&aureaSectionId={pozycjeDokumentu[].aureaSectionId}`
    const encoded = "/api/dictionaries?feature-id=test-feature&lm=nazwa&vm=kod&processId={tech.processId}&aureaSectionId={pozycjeDokumentu[].aureaSectionId}";

    const parsed = parseUrlToParams(decoded);
    const result = buildEncodedUrl(parsed);

    expect(result).toBe(encoded);
  });


  it("dekoduje i ponownie koduje URL z podstawowymi parametrami", () => {

    const decoded = `/api/dictionaries?feature-id=rodzaje-kosztu-pozycji-faktury&lm=nazwa&vm=kod&processId={tech.processId}&aureaSectionId={pozycjeDokumentu[].aureaSectionId}&customAttributes=aktualnieDostepne,{aktualnieDostepne},czyPoleCelSpotkania,{czyPoleCelSpotkania},czyPoleNazwaKlienta,{czyPoleNazwaKlienta},czyPoleLiczbaOsob,{czyPoleLiczbaOsob},czyPoleOpisDokumentu,{czyPoleOpisDokumentu},czyPoleDataPrzyjeciaPrzyjazdu,{czyPoleDataPrzyjeciaPrzyjazdu},czyPoleAkronim,{czyPoleAkronim},czyPoleNrRejestracyjny,{czyPoleNrRejestracyjny},czyPoleNosnik,{czyPoleNosnik},czyPoleRodzinaEl4,{czyPoleRodzinaEl4},czyPoleRodzinaEl5,{czyPoleRodzinaEl5},czyPoleDealDbs,{czyPoleDealDbs},czyPoleNrProjektu,{czyPoleNrProjektu},czyPoleNrZleceniaSerwisowegoDbs,{czyPoleNrZleceniaSerwisowegoDbs},czyPoleOsobaDoRefaktury,{czyPoleOsobaDoRefaktury},czyPowiadomicDzialZakupow,{czyPowiadomicDzialZakupow},powiadomienieDzialZakupowProgKowtyPln,{powiadomienieDzialZakupowProgKowtyPln},labels,expression:aureaSectionId != null ? "bm-ai-prediction" : ""&filter=aktualnieDostepne==true`
    const encoded = "/api/dictionaries?feature-id=rodzaje-kosztu-pozycji-faktury&lm=nazwa&vm=kod&processId={tech.processId}&aureaSectionId={pozycjeDokumentu[].aureaSectionId}&customAttributes=aktualnieDostepne%2C%7BaktualnieDostepne%7D%2CczyPoleCelSpotkania%2C%7BczyPoleCelSpotkania%7D%2CczyPoleNazwaKlienta%2C%7BczyPoleNazwaKlienta%7D%2CczyPoleLiczbaOsob%2C%7BczyPoleLiczbaOsob%7D%2CczyPoleOpisDokumentu%2C%7BczyPoleOpisDokumentu%7D%2CczyPoleDataPrzyjeciaPrzyjazdu%2C%7BczyPoleDataPrzyjeciaPrzyjazdu%7D%2CczyPoleAkronim%2C%7BczyPoleAkronim%7D%2CczyPoleNrRejestracyjny%2C%7BczyPoleNrRejestracyjny%7D%2CczyPoleNosnik%2C%7BczyPoleNosnik%7D%2CczyPoleRodzinaEl4%2C%7BczyPoleRodzinaEl4%7D%2CczyPoleRodzinaEl5%2C%7BczyPoleRodzinaEl5%7D%2CczyPoleDealDbs%2C%7BczyPoleDealDbs%7D%2CczyPoleNrProjektu%2C%7BczyPoleNrProjektu%7D%2CczyPoleNrZleceniaSerwisowegoDbs%2C%7BczyPoleNrZleceniaSerwisowegoDbs%7D%2CczyPoleOsobaDoRefaktury%2C%7BczyPoleOsobaDoRefaktury%7D%2CczyPowiadomicDzialZakupow%2C%7BczyPowiadomicDzialZakupow%7D%2CpowiadomienieDzialZakupowProgKowtyPln%2C%7BpowiadomienieDzialZakupowProgKowtyPln%7D%2Clabels%2Cexpression%3AaureaSectionId%20%21%3D%20null%20%3F%20%22bm-ai-prediction%22%20%3A%20%22%22&filter=aktualnieDostepne%3D%3Dtrue";

    const parsed = parseUrlToParams(decoded);
    const result = buildEncodedUrl(parsed);

    expect(result).toBe(encoded);
  });
});
