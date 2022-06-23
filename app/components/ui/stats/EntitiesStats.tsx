import { useTransition } from "@remix-run/react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Stat } from "~/application/dtos/stats/Stat";
import { StatChange } from "~/application/dtos/stats/StatChange";

interface Props {
  items: Stat[];
}

export function EntitiesStats({ items }: Props) {
  const { t } = useTranslation();
  const transition = useTransition();
  const loading = transition.state === "loading";
  return (
    <div>
      <h3 className=" leading-4 font-medium text-gray-900">Last 30 days</h3>
      <dl
        className={clsx(
          "mt-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:divide-y-0 md:divide-x",
          items.length === 1 && "md:grid-cols-1",
          items.length === 2 && "md:grid-cols-2",
          items.length === 3 && "md:grid-cols-3",
          items.length === 4 && "md:grid-cols-4",
          items.length === 5 && "md:grid-cols-5",
          items.length === 6 && "md:grid-cols-6"
        )}
      >
        {items.map((item) => (
          // <Link to={UrlUtils.replaceVariables(params, item.path) ?? ""} key={item.name} className="px-4 py-5 sm:p-6"></Link>
          <span key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900 flex space-x-1 items-baseline">
              <div>{t(item.name)}</div>
              {item.hint && <div className="text-xs hidden xl:block text-gray-400">({t(item.hint)})</div>}
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-gray-800">
                <div>{loading ? "..." : item.stat}</div>
                <span className="ml-2 text-sm font-medium text-gray-500 hidden xl:block">{!loading && <span>from {item.previousStat}</span>}</span>
              </div>

              {!loading && (
                <div
                  className={clsx(
                    item.changeType === StatChange.Increase ? " text-teal-800" : " text-rose-800",
                    "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                  )}
                >
                  {item.changeType === StatChange.Increase ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-teal-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : item.changeType === StatChange.Decrease ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-rose-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className=" text-gray-500">-</div>
                  )}

                  <span className="sr-only">{item.changeType === StatChange.Increase ? "Increased" : "Decreased"} by</span>
                  {item.change}
                </div>
              )}
            </dd>
          </span>
        ))}
      </dl>
    </div>
  );
}
