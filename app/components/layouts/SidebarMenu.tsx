import { Link, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { SideBarItem } from "~/application/sidebar/SidebarItem";
import { SidebarGroup } from "~/application/sidebar/SidebarGroup";
import clsx from "~/utils/shared/ClassesUtils";
import { useTranslation } from "react-i18next";
import { useParams } from "@remix-run/react";
import UrlUtils from "~/utils/shared/UrlUtils";
import { SidebarItems } from "~/application/sidebar/SidebarItems";

interface Props {
  onSelected?: () => void;
}

export default function SidebarMenu({ onSelected }: Props) {
  const params = useParams();
  const { t } = useTranslation();
  const location = useLocation();

  const [menu, setMenu] = useState<SideBarItem[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    let menu: SideBarItem[] = [];
    menu = SidebarItems;
    menu.forEach((group) => {
      group.items?.forEach((element) => {
        if (element.open || isCurrent(element)) {
          expanded.push(element.path);
        } else {
          setExpanded(expanded.filter((f) => f !== element.path));
        }
      });
    });

    setMenu(menu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function menuItemIsExpanded(path: string) {
    return expanded.includes(path);
  }
  function toggleMenuItem(path: string) {
    if (expanded.includes(path)) {
      setExpanded(expanded.filter((item) => item !== path));
    } else {
      setExpanded([...expanded, path]);
    }
  }
  function getPath(item: SideBarItem) {
    return UrlUtils.replaceVariables(params, item.path) ?? "";
  }
  function isCurrent(menuItem: SideBarItem) {
    if (menuItem.path) {
      if (menuItem.exact) {
        return location.pathname === getPath(menuItem);
      }
      return location.pathname?.includes(getPath(menuItem));
    }
  }

  const getMenu = (): SidebarGroup[] => {
    const _menu: SidebarGroup[] = [];
    menu.forEach(({ title, items }) => {
      _menu.push({
        title: title.toString(),
        items: items ?? [],
      });
    });
    return _menu.filter((f) => f.items.length > 0);
  };

  return (
    <div className=" ">
      <div className="sm:hidden space-y-2 divide-y-2 divide-slate-800">
        {getMenu().map((group, index) => {
          return (
            <div key={index} className="mt-2">
              <div id={group.title} className="mt-2">
                <h3 className="px-1 text-xs leading-4 font-semibold text-slate-500 uppercase tracking-wider">{t(group.title)}</h3>
              </div>
              {group.items.map((menuItem, index) => {
                return (
                  <div key={index}>
                    {(() => {
                      if (!menuItem.items || menuItem.items.length === 0) {
                        return (
                          <div>
                            {menuItem.path.includes("://") ? (
                              <a
                                target="_blank"
                                href={menuItem.path}
                                rel="noreferrer"
                                className={clsx(
                                  "px-4 mt-1 group flex items-center space-x-4 py-2 text-base leading-5 rounded-sm hover:text-white text-slate-300 focus:outline-none focus:text-gray-50 transition ease-in-out duration-150 hover:bg-slate-800 focus:bg-slate-800"
                                )}
                                onClick={onSelected}
                              >
                                <div>{t(menuItem.title)}</div>
                              </a>
                            ) : (
                              <Link
                                id={UrlUtils.slugify(getPath(menuItem))}
                                to={getPath(menuItem)}
                                className={clsx(
                                  "px-4 mt-1 group flex items-center space-x-4 py-2 text-base leading-5 rounded-sm hover:text-white text-slate-300 focus:outline-none focus:text-gray-50 transition ease-in-out duration-150",
                                  isCurrent(menuItem) && "text-slate-300 bg-theme-600 focus:bg-theme-700",
                                  !isCurrent(menuItem) && "text-slate-200 hover:bg-slate-800 focus:bg-slate-800"
                                )}
                                onClick={onSelected}
                              >
                                <div>{t(menuItem.title)}</div>
                              </Link>
                            )}
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            <div
                              className="px-4 justify-between mt-1 group flex items-center py-2 text-base leading-5 rounded-sm hover:text-white focus:outline-none focus:text-gray-50 focus:bg-slate-800 transition ease-in-out duration-150 text-slate-200 hover:bg-slate-800"
                              onClick={() => toggleMenuItem(menuItem.path)}
                            >
                              <div className="flex items-center space-x-4">
                                <div>{t(menuItem.title)}</div>
                              </div>
                              {/*Expanded: "text-gray-400 rotate-90", Collapsed: "text-slate-200" */}
                              <svg
                                className={clsx(
                                  "ml-auto h-5 w-5 transform transition-colors ease-in-out duration-150",
                                  menuItemIsExpanded(menuItem.path)
                                    ? "rotate-90 ml-auto h-3 w-3 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"
                                    : "ml-auto h-3 w-3 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"
                                )}
                                viewBox="0 0 20 20"
                              >
                                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                              </svg>
                            </div>
                            {/*Expandable link section, show/hide based on state. */}
                            {menuItemIsExpanded(menuItem.path) && (
                              <div className="mt-1">
                                {menuItem.items.map((subItem, index) => {
                                  return (
                                    <>
                                      {menuItem.path.includes("://") ? (
                                        <a
                                          target="_blank"
                                          href={menuItem.path}
                                          rel="noreferrer"
                                          className={clsx(
                                            "pl-10 mt-1 group flex items-center py-2 sm:text-sm leading-5 rounded-sm hover:text-slate-300 focus:outline-none focus:text-slate-300 transition ease-in-out duration-150 text-slate-200 hover:bg-slate-800 focus:bg-slate-800"
                                          )}
                                          onClick={onSelected}
                                        >
                                          {t(subItem.title)}
                                        </a>
                                      ) : (
                                        <Link
                                          key={index}
                                          id={UrlUtils.slugify(getPath(subItem))}
                                          to={getPath(subItem)}
                                          className={clsx(
                                            "pl-10 mt-1 group flex items-center py-2 sm:text-sm leading-5 rounded-sm hover:text-slate-300 focus:outline-none focus:text-slate-300 transition ease-in-out duration-150",
                                            isCurrent(subItem) && "text-slate-300 bg-theme-600 focus:bg-theme-700",
                                            !isCurrent(subItem) && "text-slate-200 hover:bg-slate-800 focus:bg-slate-800"
                                          )}
                                          onClick={onSelected}
                                        >
                                          {t(subItem.title)}
                                        </Link>
                                      )}{" "}
                                    </>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }
                    })()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="hidden sm:block space-y-2 divide-y-2 divide-slate-800">
        {getMenu().map((group, index) => {
          return (
            <div key={index} className="select-none">
              <div className="mt-2">
                <h3 id="Group-headline" className="px-1 text-xs leading-4 font-semibold text-slate-500 uppercase tracking-wider">
                  {t(group.title)}
                </h3>
              </div>
              {group.items.map((menuItem, index) => {
                return (
                  <div key={index}>
                    {(() => {
                      if (!menuItem.items || menuItem.items.length === 0) {
                        return (
                          <div>
                            {menuItem.path.includes("://") ? (
                              <a
                                target="_blank"
                                href={menuItem.path}
                                rel="noreferrer"
                                className={clsx(
                                  "px-4 justify-between mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-white focus:outline-none focus:text-gray-50 transition ease-in-out duration-150 truncate text-slate-200 hover:bg-slate-800 focus:bg-slate-800",
                                  menuItem.icon !== undefined && "px-4"
                                )}
                                onClick={onSelected}
                              >
                                <div className="flex items-center space-x-5">
                                  <div>{t(menuItem.title)}</div>
                                </div>
                                {menuItem.side}
                              </a>
                            ) : (
                              <Link
                                id={UrlUtils.slugify(getPath(menuItem))}
                                to={getPath(menuItem)}
                                className={clsx(
                                  "px-4 justify-between mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-white text-slate-300 focus:outline-none focus:text-gray-50 transition ease-in-out duration-150 truncate",
                                  menuItem.icon !== undefined && "px-4",
                                  isCurrent(menuItem) && "text-slate-300 bg-theme-600 focus:bg-theme-700",
                                  !isCurrent(menuItem) && "text-slate-200 hover:bg-slate-800 focus:bg-slate-800"
                                )}
                                onClick={onSelected}
                              >
                                <div className="flex items-center space-x-5">
                                  <div>{t(menuItem.title)}</div>
                                </div>
                                {menuItem.side}
                              </Link>
                            )}
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            <button
                              type="button"
                              className="w-full px-4 justify-between mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-white focus:outline-none focus:text-gray-50 transition ease-in-out duration-150 text-slate-200 hover:bg-slate-800 focus:bg-slate-800 truncate"
                              onClick={() => toggleMenuItem(menuItem.path)}
                            >
                              <div className="flex items-center space-x-5">
                                <div>{t(menuItem.title)}</div>
                              </div>
                              {/*Expanded: "text-gray-400 rotate-90", Collapsed: "text-slate-200" */}

                              {menuItem.side ?? (
                                <svg
                                  className={clsx(
                                    "bg-slate-900 ml-auto h-5 w-5 transform transition-colors ease-in-out duration-150",
                                    menuItemIsExpanded(menuItem.path)
                                      ? "rotate-90 ml-auto h-3 w-3 transform  transition-colors ease-in-out duration-150"
                                      : "ml-auto h-3 w-3 transform  transition-colors ease-in-out duration-150"
                                  )}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                </svg>
                              )}
                            </button>

                            {/*Expandable link section, show/hide based on state. */}
                            {menuItemIsExpanded(menuItem.path) && (
                              <div className="mt-1">
                                {menuItem.items.map((subItem, index) => {
                                  return (
                                    <>
                                      {menuItem.path.includes("://") ? (
                                        <a
                                          target="_blank"
                                          href={menuItem.path}
                                          rel="noreferrer"
                                          className={clsx(
                                            isCurrent(subItem) && "text-slate-300 bg-theme-600 focus:bg-theme-700",
                                            "mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-white focus:outline-none focus:text-gray-50 text-slate-300 transition ease-in-out duration-150 ",
                                            menuItem.icon === undefined && "pl-8",
                                            menuItem.icon !== undefined && "pl-12"
                                          )}
                                          onClick={onSelected}
                                        >
                                          <div>{t(subItem.title)}</div>
                                        </a>
                                      ) : (
                                        <Link
                                          key={index}
                                          id={UrlUtils.slugify(getPath(subItem))}
                                          to={getPath(subItem)}
                                          className={clsx(
                                            "mt-1 group flex items-center py-2 text-sm leading-5 rounded-sm hover:text-white focus:outline-none focus:text-gray-50 text-slate-300 transition ease-in-out duration-150",
                                            menuItem.icon === undefined && "pl-8",
                                            menuItem.icon !== undefined && "pl-12",
                                            isCurrent(subItem) && "text-slate-300 bg-theme-600 focus:bg-theme-700",
                                            !isCurrent(subItem) && "text-slate-200 hover:bg-slate-800 focus:bg-slate-800"
                                          )}
                                          onClick={onSelected}
                                        >
                                          <div>{t(subItem.title)}</div>
                                        </Link>
                                      )}
                                    </>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }
                    })()}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
