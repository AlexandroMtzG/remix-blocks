import { getUserInfo } from "~/utils/session.server";
import { i18n } from "./i18n.server";

export async function i18nHelper(request: Request) {
  const userInfo = await getUserInfo(request);
  let t = await i18n.getFixedT(request, "translations");
  const translations = await i18n.getTranslations(userInfo.lng ?? request, ["translations"]);
  return { t, translations };
}
