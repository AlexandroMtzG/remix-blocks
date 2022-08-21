import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import BlockLayout from "~/components/blocks/BlockLayout";
import { BlockLoaderData, getBlockLoaderData } from "~/components/blocks/BlockLoader";
import styles from "highlight.js/styles/night-owl.css";

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
    <BlockLayout item={data.block} className="">
      <Outlet />
    </BlockLayout>
  );
}
