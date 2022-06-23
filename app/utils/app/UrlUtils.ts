import { Params } from "react-router";

const stripTrailingSlash = (str: string) => {
  return str.endsWith("/") ? str.slice(0, -1) : str;
};

const currentTenantUrl = (params: Params, path?: string) => {
  const { tenant } = params;
  if (path) {
    const appPath = path.startsWith("/") ? path.substring(1, path.length - 1) : path;
    // console.log({ appPath });
    return `/app/${tenant}/${appPath}`;
  }
  return `/app/${tenant}/`;
};

const replaceVariables = (params: Params, path?: string) => {
  return path?.replace(":tenant", params.tenant ?? "");
};

const slugify = (str: string, max: number = 25) => {
  let value = str
    .toLowerCase()
    .trim()
    .replace("/", "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (max > 0) {
    value = value.padEnd(25, "").substring(0, 25);
  }
  return value.trim();
};

export default {
  currentTenantUrl,
  stripTrailingSlash,
  slugify,
  replaceVariables,
};
