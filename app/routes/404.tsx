import { json, LoaderFunction } from "remix";
import Page404 from "~/components/pages/Page404";
import { i18nHelper } from "~/locale/i18n.utils";

export let loader: LoaderFunction = async ({ request }) => {
  let { t, translations } = await i18nHelper(request);
  return json({
    title: `${t("shared.notFound")} | ${process.env.APP_NAME}`,
    i18n: translations,
  });
};

export default function Route404() {
  return (
    <>
      <Page404 />
    </>
  );
}
