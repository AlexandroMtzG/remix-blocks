import clsx from "clsx";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "remix";
import { PaginationDto } from "~/application/dtos/data/PaginationDto";
import { InputType } from "~/application/enums/shared/InputType";
import ButtonTertiary from "../buttons/ButtonTertiary";
import InputNumber from "../input/InputNumber";
import InputSelect from "../input/InputSelect";
import InputText from "../input/InputText";
import TablePagination from "./TablePagination";

export type Header<T> = {
  title: string;
  name: string;
  type?: InputType;
  value: (item: T) => any;
  href?: (item: T) => any | undefined;
  formattedValue?: (item: T) => string | ReactNode;
  options?: { name: string; value: number | string; disabled?: boolean }[];
  setValue?: (value: any, idx: number) => void;
  editable?: (item: T) => boolean;
  className?: string;
  sortable?: boolean;
  breakpoint?: "sm" | "md" | "lg" | "xl" | "2xl";
};

interface Props<T> {
  headers: Header<T>[];
  items: T[];
  actions?: { title: string; onClick?: (idx: number, item: T) => void; onClickRoute?: (idx: number, item: T) => string; disabled?: boolean }[];
  updatesUrl?: boolean;
  pagination?: PaginationDto;
}

export default function TableSimple<T>({ headers, items, actions = [], updatesUrl = false, pagination }: Props<T>) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  function onSortBy(header: Header<T>) {
    let sort = header.name.toString();
    let direction = "-";
    if (pagination?.sortedBy?.name === header.name) {
      direction = pagination?.sortedBy?.direction === "asc" ? "-" : "";
    }
    sort = direction + sort;
    searchParams.set("page", "1");
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  }
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, idxHeader) => {
                    return (
                      <th
                        key={idxHeader}
                        onClick={() => header.sortable && onSortBy(header)}
                        scope="col"
                        className={clsx(
                          idxHeader === 0 && "pl-4",
                          "text-xs px-2 py-1 text-left font-medium text-gray-500 tracking-wider select-none truncate",
                          header.sortable && "cursor-pointer hover:text-gray-700",
                          header.breakpoint === "sm" && "hidden sm:table-cell",
                          header.breakpoint === "md" && "hidden mg:table-cell",
                          header.breakpoint === "lg" && "hidden lg:table-cell",
                          header.breakpoint === "xl" && "hidden xl:table-cell",
                          header.breakpoint === "2xl" && "hidden 2xl:table-cell"
                        )}
                      >
                        <div className={clsx("flex items-center space-x-1 text-gray-500", header.className)}>
                          <div>{header.title}</div>
                          <div className={clsx((!header.name || pagination?.sortedBy?.name !== header.name) && "invisible")}>
                            {(() => {
                              if (pagination?.sortedBy?.direction === "asc") {
                                return (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                      fillRule="evenodd"
                                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                );
                              } else {
                                return (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                      fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                );
                              }
                            })()}
                          </div>
                        </div>
                      </th>
                    );
                  })}
                  {actions.length > 0 && (
                    <th scope="col" className="text-xs px-2 py-1 text-left font-medium text-gray-500 tracking-wider select-none truncate"></th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={headers.length} className="text-center">
                      <div className="p-3 text-gray-500 text-sm">{t("shared.noRecords")}</div>
                    </td>
                  </tr>
                ) : (
                  items.map((item, idxRow) => {
                    return (
                      <tr key={idxRow}>
                        {headers.map((header, idxHeader) => {
                          return (
                            <td
                              key={idxHeader}
                              className={clsx(
                                idxHeader === 0 && "pl-4",
                                "px-2 py-2 whitespace-nowrap text-sm text-gray-600",
                                header.className,
                                header.breakpoint === "sm" && "hidden sm:table-cell",
                                header.breakpoint === "md" && "hidden mg:table-cell",
                                header.breakpoint === "lg" && "hidden lg:table-cell",
                                header.breakpoint === "xl" && "hidden xl:table-cell",
                                header.breakpoint === "2xl" && "hidden 2xl:table-cell"
                              )}
                            >
                              {!header.setValue ? (
                                <>
                                  {header.href !== undefined ? (
                                    <Link
                                      to={header.href(item)}
                                      className="p-2 hover:bg-gray-50 border border-transparent hover:border-gray-300 rounded-md focus:bg-gray-100"
                                    >
                                      {header.formattedValue ? header.formattedValue(item) : header.value(item)}
                                    </Link>
                                  ) : (
                                    <>{header.formattedValue ? header.formattedValue(item) : header.value(item)}</>
                                  )}
                                </>
                              ) : (
                                <>
                                  {header.type === undefined || header.type === InputType.TEXT ? (
                                    <InputText
                                      withLabel={false}
                                      name={header.name}
                                      title={header.title}
                                      value={header.value(item)}
                                      disabled={header.editable && !header.editable(item)}
                                      setValue={(e) => {
                                        if (header.setValue) {
                                          header.setValue(e, idxRow);
                                        }
                                      }}
                                      required
                                    />
                                  ) : header.type === InputType.NUMBER ? (
                                    <InputNumber
                                      withLabel={false}
                                      name={header.name}
                                      title={header.title}
                                      value={header.value(item)}
                                      disabled={header.editable && !header.editable(item)}
                                      setValue={(e) => {
                                        if (header.setValue) {
                                          header.setValue(e, idxRow);
                                        }
                                      }}
                                      required
                                    />
                                  ) : header.type === InputType.SELECT ? (
                                    <InputSelect
                                      withLabel={false}
                                      name={header.name}
                                      title={header.title}
                                      value={header.value(item)}
                                      setValue={(e) => {
                                        if (header.setValue) {
                                          header.setValue(Number(e), idxRow);
                                        }
                                      }}
                                      options={header.options ?? []}
                                      required
                                      disabled={header.editable && !header.editable(item)}
                                    />
                                  ) : (
                                    <td></td>
                                  )}
                                </>
                              )}
                            </td>
                          );
                        })}
                        {actions && (
                          <td className="px-2 py-1 whitespace-nowrap text-sm text-gray-600">
                            <div className="flex space-x-2">
                              {actions.map((action) => {
                                return (
                                  <ButtonTertiary
                                    disabled={action.disabled}
                                    key={action.title}
                                    onClick={() => {
                                      if (action.onClick) {
                                        action.onClick(idxRow, item);
                                      }
                                    }}
                                    to={action.onClickRoute && action.onClickRoute(idxRow, item)}
                                  >
                                    {action.title}
                                  </ButtonTertiary>
                                );
                              })}
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
                )}

                {/* {[...Array(pageSize - items.length)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={headers.length + 1} className="whitespace-nowrap text-sm text-gray-600">
                      <div className="px-2 py-2.5 invisible">No row</div>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
            {/* {JSON.stringify(pagination)} */}
            {updatesUrl && pagination && (
              <TablePagination totalItems={pagination.totalItems} totalPages={pagination.totalPages} page={pagination.page} pageSize={pagination.pageSize} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
