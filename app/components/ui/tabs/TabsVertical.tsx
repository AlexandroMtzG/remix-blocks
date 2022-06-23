import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import clsx from "~/utils/shared/ClassesUtils";

export interface TabItem {
  name: any;
  routePath?: string;
}

interface Props {
  className?: string;
  tabs: TabItem[];
  asLinks?: boolean;
  onSelected?: (idx: number) => void;
}

export default function TabsVertical({ className = "", tabs = [], asLinks = true, onSelected }: Props) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    tabs.forEach((tab, index) => {
      if (tab.routePath && (location.pathname + location.search).includes(tab.routePath)) {
        setSelected(index);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs, location.pathname]);

  function selectTab(idx: number) {
    const tab = tabs[idx];
    setSelected(idx);
    if (asLinks) {
      if (tab?.routePath) {
        navigate(tab.routePath);
      }
    } else {
      if (onSelected) {
        onSelected(idx);
      }
    }
  }
  function isCurrent(idx: number) {
    return currentTab() === tabs[idx];
  }
  const currentTab = () => {
    if (asLinks) {
      return tabs.find((element) => element.routePath && (location.pathname + location.search).includes(element.routePath));
    } else {
      return tabs[selected];
    }
  };
  return (
    <nav className={clsx("space-y-1 w-full", className)} aria-label="Sidebar">
      <div className="lg:hidden">
        <label htmlFor="tabs" className="sr-only">
          {t("app.shared.tabs.select")}
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-theme-500 focus:border-theme-500 border-gray-300 rounded-md"
          onChange={(e) => selectTab(Number(e.target.value))}
          value={selected}
        >
          {tabs.map((item, idx) => {
            return (
              <option key={item.name} value={Number(idx)}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="hidden lg:block">
        {tabs.map((item, idx) => (
          <Link
            key={item.name}
            to={item.routePath ?? ""}
            className={clsx(
              "border",
              isCurrent(idx) ? "bg-gray-100 border-gray-200 shadow-sm text-gray-900" : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "flex items-center px-3 py-2 text-sm font-medium rounded-md"
            )}
          >
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
