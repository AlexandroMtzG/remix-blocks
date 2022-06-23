import { redirect } from "remix";
import { Language } from "remix-i18next";
import { i18nHelper } from "~/locale/i18n.utils";
import UrlUtils from "~/utils/app/UrlUtils";
import { BlockItem, getBlockByPath } from "./BlockItems";

export type BlockLoaderData = {
  title: string;
  i18n: Record<string, Language>;
  block: BlockItem;
};

export async function getBlockLoaderData({ request }: { request: Request }) {
  let { translations } = await i18nHelper(request);

  const pathname = UrlUtils.stripTrailingSlash(new URL(request.url).pathname);
  const block = getBlockByPath(pathname.replace("/code", ""));
  if (!block) {
    throw redirect("/404");
  }
  const data: BlockLoaderData = {
    title: `${block.title} | ${process.env.APP_NAME}`,
    i18n: translations,
    block,
  };
  return data;
}
