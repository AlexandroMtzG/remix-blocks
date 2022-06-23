import { KeyboardEvent, Ref, forwardRef, useImperativeHandle, useRef, ReactNode } from "react";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import clsx from "~/utils/shared/ClassesUtils";
import { useTranslation } from "react-i18next";
import { Link } from "remix";

export interface RefInputSelector {
  focus: () => void;
}

interface Props {
  name: string;
  title: string;
  value?: string | number | undefined;
  disabled?: boolean;
  options: { name: string | ReactNode; value: string | number | undefined }[];
  setValue?: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  className?: string;
  withSearch?: boolean;
  onNew?: () => void;
  onNewRoute?: string;
  required?: boolean;
}
const InputSelector = (
  { name, title, value, options, disabled, setValue, className, withSearch = true, onNew, required, onNewRoute }: Props,
  ref: Ref<RefInputSelector>
) => {
  const { t } = useTranslation();

  const button = useRef<HTMLButtonElement>(null);
  const inputSearch = useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState<{ name: string | ReactNode; value: string | number | undefined }>();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const selected = options.find((f) => f.value === value);
    setSelected(selected);
  }, [options, value]);

  useEffect(() => {
    if (selected && setValue && value !== selected?.value) {
      setValue(selected?.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useImperativeHandle(ref, () => ({ focus }));
  function focus() {
    setTimeout(() => {
      button.current?.focus();
      button.current?.click();
    }, 1);
  }

  function trySelect(event: KeyboardEvent) {
    if (event.code === "Enter") {
      if (filteredItems().length > 0) {
        setSelected(filteredItems()[0]);
      }
    }
  }

  const filteredItems = () => {
    if (!options) {
      return [];
    }
    return options.filter(
      (f) => f.name?.toString().toUpperCase().includes(searchInput.toUpperCase()) || f.value?.toString().toUpperCase().includes(searchInput.toUpperCase())
    );
  };

  return (
    <Listbox value={selected} onChange={setSelected} disabled={disabled}>
      {({ open }) => (
        <div className={clsx(className, "text-gray-800")}>
          <Listbox.Label htmlFor={name} className="block text-xs font-medium text-gray-600 truncate">
            {title}
            {required && <span className="ml-1 text-red-500">*</span>}
          </Listbox.Label>

          <div className="mt-1 relative">
            <Listbox.Button
              type="button"
              ref={button}
              className={clsx(
                "relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 sm:text-sm",
                disabled && "bg-gray-100 cursor-not-allowed"
              )}
            >
              <input type="hidden" readOnly name={name} value={selected?.value ?? ""} />
              <span className="w-full inline-flex truncate">
                <span className="truncate">
                  {selected ? <span>{selected?.name}</span> : <span className="text-sm text-gray-500">{t("shared.select")}...</span>}
                </span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Listbox.Button>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options
                // onFocus={() => inputSearch.current?.focus()}
                onBlur={() => setSearchInput("")}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {(withSearch || onNew || onNewRoute) && (
                  <div className="p-2 flex rounded-md">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        ref={inputSearch}
                        id="search"
                        autoComplete="off"
                        onKeyDown={trySelect}
                        placeholder={t("shared.searchDot")}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="focus:ring-gray-300 focus:border-accent-300 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 px-3 py-2 bg-white text-sm border focus:outline-none"
                      />
                    </div>
                    {onNew && (
                      <button
                        type="button"
                        onClick={onNew}
                        className="-ml-px relative inline-flex items-center space-x-2 px-2 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    )}

                    {onNewRoute && (
                      <Link
                        to={onNewRoute}
                        className="-ml-px relative inline-flex items-center space-x-2 px-2 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}

                {filteredItems().map((item, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      clsx(active ? "text-white bg-accent-600" : "text-gray-900", "cursor-default select-none relative py-2 pl-3 pr-9")
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex">
                          <span className={clsx(selected ? "font-semibold" : "font-normal", "truncate")}>{item.name}</span>
                        </div>

                        {selected ? (
                          <span className={clsx(active ? "text-white" : "text-accent-600", "absolute inset-y-0 right-0 flex items-center pr-4")}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}

                {withSearch && filteredItems().length === 0 && <div className="py-2 px-3 text-gray-400 text-sm">{t("shared.noRecords")}</div>}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default forwardRef(InputSelector);
