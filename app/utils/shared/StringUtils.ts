const toCamelCase = (value: string) => {
  return value.replace(/(?<!\p{L})\p{L}|\s+/gu, (m) => (+m === 0 ? "" : m.toUpperCase())).replace(/^./, (m) => m?.toLowerCase());
};
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default {
  toCamelCase,
  capitalize,
};
