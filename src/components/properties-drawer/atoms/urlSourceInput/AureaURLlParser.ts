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

  };

  const query = url.includes("?") ? url.split("?")[1] : url;
  const params = new URLSearchParams(query || "");

  dictionary["feature-id"] = params.get("feature-id");
  dictionary.vm = params.get("vm");
  dictionary.lm = params.get("lm");
  dictionary.dm = params.get("dm");
  dictionary.filter = params.get("filter");
  dictionary.processId = params.get("processId");
  dictionary.aureaSectionId = params.get("aureaSectionId");

  parseCustomAttributesFromBrackets(params, dictionary);
  parseCustomAttributesFromFlat(params, dictionary);

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
  const pairPattern = /([^,]+),\{([^}]*)\}/g;

  for (const flat of flatValues) {
    let match: RegExpExecArray | null;
    while ((match = pairPattern.exec(flat)) !== null) {
      dictionary.customAttributes.push({
        name: match[1] || null,
        reference: match[2] || null,
      });
    }
  }
}

// ============ URL BUILDING ============
export function buildEncodedUrl(params: DictionaryParams): string {
  let url = `/api/dictionaries?feature-id=${params["feature-id"]}&lm=${params.lm}&vm=${params.vm}`;

  if (params.dm) {
    url += `&dm=${encodeURIComponent(params.dm)}`;
  }

  const customAttrsStr = buildCustomAttributesString(params.customAttributes);
  if (customAttrsStr) {
    url += `&customAttributes=${encodeURIComponent(customAttrsStr)}`;
  }

  if (params.filter) {
    url += `&filter=${encodeParamWithBracketAsVariable(params.filter)}`;
  }

  if(params.processId) {
    url += `&processId=${encodeParamWithBracketAsVariable(params.processId)}`;
  }
  if(params.aureaSectionId) {
    url += `&aureaSectionId=${encodeParamWithBracketAsVariable(params.aureaSectionId)}`;
  }

  return url;
}

function buildCustomAttributesString(attributes: CustomAttribute[]): string {
  return attributes
    .filter((attr) => attr.name && attr.reference)
    .map((attr) => `${attr.name},{${attr.reference}}`)
    .join(",");
}

function encodeParamWithBracketAsVariable(filter: string): string {
  const SAFE_LEFT = "___SAFE_L___";
  const SAFE_RIGHT = "___SAFE_R___";

  return filter
    .replace(/\{([^}]+)\}/g, (_, group) => {
      const safe = group.replace(/\[/g, SAFE_LEFT).replace(/\]/g, SAFE_RIGHT);
      const encoded = encodeURIComponent(safe);
      return "{" + encoded.replace(new RegExp(SAFE_LEFT, "g"), "[").replace(new RegExp(SAFE_RIGHT, "g"), "]") + "}";
    })
    .replace(/(.*?)(?=\{)|(?<=\})(.*)/g, (segment) => encodeURIComponent(segment));
}
