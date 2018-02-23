export function getPrettyUrl(str: string): string {
  return str.replace(/https?\:\/\//, "");
}

export function buildUrlFromStr(str: string): string {
  if (/^https?\:\/\//.test(str)) {
    return str;
  }
  // TODO : We need to determine if we can use https or if we need to supply only http back
  return `https://${str}`;
}
