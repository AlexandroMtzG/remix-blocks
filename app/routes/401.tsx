import { json, LoaderFunction, MetaFunction } from "remix";
import Page401 from "~/components/pages/Page401";
import { i18nHelper } from "~/locale/i18n.utils";

export let loader: LoaderFunction = async ({ request }) => {
  let { t, translations } = await i18nHelper(request);
  return json({
    title: `${t("shared.unauthorized")} | ${process.env.APP_NAME}`,
    i18n: translations,
  });
};

export const meta: MetaFunction = ({ data }) => ({
  title: data?.title,
});

export default function Route401() {
  return <Page401 />;
}
