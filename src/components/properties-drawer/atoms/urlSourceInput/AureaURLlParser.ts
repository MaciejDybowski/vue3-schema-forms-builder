export interface CustomAttribute {
  name: string | null;
  reference: string | null;
}

export interface DictionaryParams {
  "feature-id": string | null;
  vm: string | null;
  lm: string | null;
  dm: string | null;
  customAttributes: CustomAttribute[];
  filter: string | null;
  processId?: string | null;
  aureaSectionId?: string | null;
  "value-filter"?: string | null;
  "enable-filter"?: string | null;
}


export function parseUrlToParams(url: string): DictionaryParams {
  const dictionary: DictionaryParams = {
    "feature-id": null,
    lm: null,
    vm: null,
    processId: null,
    aureaSectionId: null,
    dm: null,
    customAttributes: [],
    filter: null,
    "value-filter": null,
    "enable-filter": null,
  };

  const [path, ...rest] = url.split("?");

  let query = rest.join("?") || "";

  if (rest.length === 2) {
    // // obejscie dla customAttributes -> expression: sth != test ? '2' : '1' w custom attributes
    query = rest[0] + "?" + rest[1];
  }

  const params = new URLSearchParams(query || "");


  dictionary["feature-id"] = params.get("feature-id");
  dictionary.vm = params.get("vm");
  dictionary.lm = params.get("lm");
  dictionary.dm = params.get("dm");
  dictionary.filter = params.get("filter");
  dictionary.processId = params.get("processId");
  dictionary.aureaSectionId = params.get("aureaSectionId");
  dictionary["value-filter"] = params.get("value-filter");
  dictionary["enable-filter"] = params.get("enable-filter");

  parseCustomAttributesFromBrackets(params, dictionary);
  parseCustomAttributesFromFlat(params, dictionary);

  const knownKeys = new Set(Object.keys(dictionary));
  const unknownParams: Record<string, string | null> = {};

  params.forEach((value, key) => {
    if (!knownKeys.has(key)) {
      unknownParams[key] = value;
    }
  });

  if (unknownParams && Object.keys(unknownParams).length > 0) {
    dictionary['unknownParams'] = unknownParams;
  }

  return dictionary;
}


function parseCustomAttributesFromBrackets(
  params: URLSearchParams,
  dictionary: DictionaryParams
): void {
  const pattern = /^customAttributes(?:\[(\d+)\])?\[(name|reference)\]$/;

  for (const [key, val] of params.entries()) {
    const match = key.match(pattern);
    if (!match) continue;

    const index = match[1] ? Number(match[1]) : 0;
    const prop = match[2] as keyof CustomAttribute;

    while (dictionary.customAttributes.length <= index) {
      dictionary.customAttributes.push({name: null, reference: null});
    }

    dictionary.customAttributes[index][prop] = val || null;
  }
}

function parseCustomAttributesFromFlat(
  params: URLSearchParams,
  dictionary: DictionaryParams
): void {
  const flatValues = params.getAll("customAttributes");
  const pairPattern = /([^,]+),(?:\{([^}]*)\}|(expression:[^,]*))/g;

  for (const flat of flatValues) {
    let match: RegExpExecArray | null;
    while ((match = pairPattern.exec(flat)) !== null) {
      const refRaw = match[2] ?? match[3] ?? null;
      dictionary.customAttributes.push({
        name: match[1] || null,
        reference: refRaw,
      });
    }
  }
}

// ============ URL BUILDING ============
export function buildEncodedUrl(inputValue: string, params: DictionaryParams): string {
  let url = inputValue.split("?")[0];

  if (params["feature-id"]) {
    url += `?feature-id=${params["feature-id"]}`;
  }

  if (params.lm) {
    url += `&lm=${params.lm}`;
  }

  if (params.vm) {
    url += `&vm=${params.vm}`;
  }

  if (params.processId) {
    url += `&processId=${encodeParamWithBracketAsVariable(params.processId)}`;
  }
  if (params.aureaSectionId) {
    url += `&aureaSectionId=${encodeParamWithBracketAsVariable(params.aureaSectionId)}`;
  }

  if (params.dm) {
    url += `&dm=${encodeURIComponent(params.dm)}`;
  }

  const customAttrsStr = buildCustomAttributesString(params.customAttributes);
  if (customAttrsStr) {
    // replace dla expression: sth != test ? '2' : '1' w custom attributes
    url += `&customAttributes=${encodeURIComponent(customAttrsStr).replace(/!/g, "%21")}`;
  }

  if (params.filter) {
    url += `&filter=${encodeParamWithBracketAsVariable(params.filter)}`;
  }

  if (params["value-filter"]) {
    url += `&value-filter=${encodeParamWithBracketAsVariable(params["value-filter"])}`;
  }

  if (params["enable-filter"]) {
    url += `&enable-filter=${params["enable-filter"]}`;
  }

  if (params['unknownParams']) {
    for (const [key, value] of Object.entries(params['unknownParams'] as Record<string, string>)) {
      url += `&${key}=${value}`;
    }
  }
  return url;
}

function buildCustomAttributesString(attributes: CustomAttribute[]): string {
  return attributes
    .filter((attr) => attr.name && attr.reference)
    .map((attr) => `${attr.name},${!attr.reference?.startsWith('expression') ? `{${attr.reference}}` : `${attr.reference}`}`)
    .join(",");
}

function encodeParamWithBracketAsVariable(filter: string): string {
  const SAFE_LEFT = "___SAFE_L___";
  const SAFE_RIGHT = "___SAFE_R___";

  let result = "";
  let i = 0;

  while (i < filter.length) {
    const open = filter.indexOf("{", i);
    if (open === -1) {
      result += encodeURIComponent(filter.slice(i));
      break;
    }

    if (open > i) {
      result += encodeURIComponent(filter.slice(i, open));
    }

    const close = filter.indexOf("}", open + 1);
    if (close === -1) {
      result += encodeURIComponent(filter.slice(open));
      break;
    }

    let inner = filter.slice(open + 1, close);
    inner = inner.replace(/\[/g, SAFE_LEFT).replace(/\]/g, SAFE_RIGHT);
    inner = encodeURIComponent(inner);
    inner = inner.replace(new RegExp(SAFE_LEFT, "g"), "[").replace(new RegExp(SAFE_RIGHT, "g"), "]");
    result += "{" + inner + "}";
    i = close + 1;
  }
  return result;
}
