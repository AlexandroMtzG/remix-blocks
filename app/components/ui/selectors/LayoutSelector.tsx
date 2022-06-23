import { Menu } from "@headlessui/react";
import { ApplicationLayout } from "~/application/enums/shared/ApplicationLayout";
import clsx from "clsx";
import Dropdown from "../dropdowns/Dropdown";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
  btnClassName?: string;
}

export default function LayoutSelector({ className, btnClassName }: Props) {
  const { t } = useTranslation();

  const layouts = [
    {
      name: t("shared.layouts.sidebar"),
      value: ApplicationLayout.SIDEBAR,
    },
    {
      name: t("shared.layouts.stacked"),
      value: ApplicationLayout.STACKED,
    },
  ];

  function select(value: ApplicationLayout) {
    // store.dispatch(setLayout(value));
  }

  return (
    <Dropdown
      className={className}
      btnClassName={clsx(
        "cursor-pointer select-none leading-6 font-medium focus:outline-none transition ease-in-out duration-150 px-3 py-1 rounded-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:text-gray-900 dark:focus:text-white",
        btnClassName
      )}
      button={<span>{t("settings.preferences.layouts")}</span>}
      options={
        <div>
          {layouts.map((layout, index) => {
            return (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => select(layout.value)}
                    key={index}
                    className={clsx("w-full text-left", active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
                    role="menuitem"
                  >
                    <div className="pl-1">{layout.name}</div>
                  </button>
                )}
              </Menu.Item>
            );
          })}
        </div>
      }
    />
  );
}
