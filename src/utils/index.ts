

export function mergeObjects(obj1, obj2) {
  obj1 = obj1 || {};
  obj2 = obj2 || {};
  return Object.fromEntries(
    Object.keys({...obj1, ...obj2}).map(lang => [
      lang,
      {...(obj1[lang] || {}), ...(obj2[lang] || {})}
    ])
  );
}
