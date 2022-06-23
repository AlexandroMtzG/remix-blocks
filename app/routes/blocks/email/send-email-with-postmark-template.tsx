import { LoaderFunction, MetaFunction, json } from "remix";
import { useLoaderData, Outlet } from "@remix-run/react";
import BlockLayout from "~/components/blocks/BlockLayout";
import { BlockLoaderData, getBlockLoaderData } from "~/components/blocks/BlockLoader";
import styles from "highlight.js/styles/night-owl.css";
import InfoBanner from "~/components/ui/banners/InfoBanner";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};
export const meta: MetaFunction = ({ data }) => ({ title: data?.title });
export let loader: LoaderFunction = async ({ request }) => {
  return json(await getBlockLoaderData({ request }));
};
export default function Example() {
  const data = useLoaderData<BlockLoaderData>();
  return (
    <BlockLayout
      item={data.block}
      details={<InfoBanner title="If you don't have a Postmark account" text="Use the Use the code REMIXSAASPOSTMARK for 20% discount for 3 months" />}
    >
      <Outlet />
    </BlockLayout>
  );
}
