import { useTranslation } from "react-i18next";
import { Menu } from "@headlessui/react";
import Dropdown from "../dropdowns/Dropdown";
import _supportedLocales from "~/locale/supportedLocales";
import clsx from "clsx";
import { useLocation, useSubmit } from "@remix-run/react";
import { useRootData } from "~/utils/data/useRootData";

interface Props {
  className?: string;
  btnClassName?: string;
  showFlags?: boolean;
}

export default function LocaleSelector({ className, btnClassName, showFlags }: Props) {
  const { t } = useTranslation();
  let location = useLocation();
  const submit = useSubmit();
  const rootData = useRootData();

  const supportedLocales = _supportedLocales;

  function select(value: string) {
    const form = new FormData();
    form.set("action", "setLocale");
    form.set("redirect", location.pathname);
    form.set("lng", value);
    submit(form, { method: "post", action: "/" });
  }

  function selectedLocale() {
    return supportedLocales.find((f) => f.lang === rootData.userSession.lng);
  }

  return (
    <Dropdown
      className={className}
      btnClassName={clsx(
        " bg-white dark:bg-gray-900 rounded-md px-2 py-1 inline-flex items-center justify-center text-gray-500 font-medium hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500",
        btnClassName
      )}
      button={<span>{showFlags && selectedLocale() ? selectedLocale()?.flag : t(rootData.userSession.lng)}</span>}
      options={
        <div>
          {supportedLocales.map((language, index) => {
            return (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => select(language.lang)}
                    key={index}
                    className={clsx("w-full text-left flex space-x-2", active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
                    role="menuitem"
                  >
                    {showFlags && <div>{language.flag}</div>}
                    <div>{t("shared.locales." + language.lang)}</div>
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
