import { Menu } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import DropdownOptions from "../dropdowns/DropdownOptions";
import OpenCloseArrowIcon from "../icons/OpenCloseArrowIcon";

export interface RefSimpleRow {}

interface Props {
  value: ReactNode;
  title: string;
  children: ReactNode;
  onRemove: () => void;
  initial?: boolean;
}

export default function CollapsibleRow({ value, title, children, onRemove, initial = false }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(initial);

  return (
    <div>
      <div className="flex items-center space-x-2 justify-between py-3">
        <button type="button" onClick={() => setOpen(!open)} className=" text-left w-full text-sm">
          {!open ? <span className=" text-gray-500">{value ?? "Empty"}</span> : <span className=" font-medium text-gray-800">{title}</span>}
        </button>
        <div className=" flex items-center space-x-2">
          <DropdownOptions
            options={
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={onRemove}
                      className={clsx("w-full text-left", active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
                    >
                      {t("shared.remove")}
                    </button>
                  )}
                </Menu.Item>
              </div>
            }
          ></DropdownOptions>
          <OpenCloseArrowIcon open={open} setOpen={setOpen} />
        </div>
      </div>
      {open && <div>{children}</div>}
    </div>
  );
}
