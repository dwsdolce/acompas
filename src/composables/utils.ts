export function forEachValue (obj: any, fn: any) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
