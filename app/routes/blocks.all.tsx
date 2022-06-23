import { json, Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { Language } from "remix-i18next";
import { i18nHelper } from "~/locale/i18n.utils";
import styles from "highlight.js/styles/night-owl.css";
import TableSimple from "~/components/ui/tables/TableSimple";
import { BlockItem, getAllBlocks } from "~/components/blocks/BlockItems";
import InputSearch from "~/components/ui/input/InputSearch";
import { useState } from "react";
import clsx from "clsx";
import DateUtils from "~/utils/shared/DateUtils";

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

type LoaderData = {
  title: string;
  i18n: Record<string, Language>;
  items: BlockItem[];
};
export let loader: LoaderFunction = async ({ request }) => {
  let { translations } = await i18nHelper(request);

  const data: LoaderData = {
    title: `Blocks | ${process.env.APP_NAME}`,
    i18n: translations,
    items: getAllBlocks(),
  };
  return json(data);
};

export default function AllBlocksRoute() {
  const { items } = useLoaderData<LoaderData>();
  const [searchInput, setSearchInput] = useState("");
  const filteredItems = () => {
    if (!items) {
      return [];
    }
    return items.filter(
      (f) =>
        f.group.toString().toUpperCase().includes(searchInput.toUpperCase()) ||
        f.title.toString().toUpperCase().includes(searchInput.toUpperCase()) ||
        f.path.toString().toUpperCase().includes(searchInput.toUpperCase()) ||
        f.integrations?.find(
          (f) => f.title.toString().toUpperCase().includes(searchInput.toUpperCase()) || f.url.toString().toUpperCase().includes(searchInput.toUpperCase())
        )
    );
  };
  return (
    <div className="not-prose">
      <h3 className="font-bold mb-2">All Blocks</h3>
      <InputSearch value={searchInput} setValue={setSearchInput} newTitle="Request" onNewRoute="https://github.com/AlexandroMtzG/remix-blocks/issues/new" />
      <TableSimple
        items={filteredItems()}
        headers={[
          {
            name: "group",
            title: "Group",
            value: (i) => i.group,
            className: "font-medium",
          },
          {
            name: "title",
            title: "Title",
            value: (i) => i.title,
            formattedValue: (i) => (
              <div>
                {i.createdAt ? (
                  <Link className="hover:underline" to={i.path}>
                    {i.title}
                  </Link>
                ) : (
                  <div className="cursor-not-allowed text-gray-400">{i.title}</div>
                )}
              </div>
            ),
          },
          {
            name: "integrations",
            title: "Integrations",
            value: (i) => i.integrations?.map((f) => f.title).join(", "),
            formattedValue: (i) => (
              <div className="flex space-x-2 items-center truncate">
                {i.integrations?.map((i) => {
                  return (
                    <a key={i.title} className={clsx("underline hover:text-theme-500 truncate", i.className)} target="_blank" href={i.url} rel="noreferrer">
                      {i.img && <img className="h-5 w-auto object-cover" alt={i.title} src={i.img} />}
                    </a>
                  );
                })}
              </div>
            ),
            breakpoint: "lg",
          },
          {
            name: "createdAt",
            title: "Created At",
            value: (i) => i.createdAt,
            formattedValue: (i) => (
              <div>
                {i.createdAt ? (
                  <span className="text-gray-400">{DateUtils.dateDM(i.createdAt)}</span>
                ) : (
                  <span className="text-gray-300 italic text-xs">Coming soon</span>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
