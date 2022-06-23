import { Link, useLocation } from "@remix-run/react";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import Dropdown from "./Dropdown";

export default function PreviewDropdownsSimple() {
  const currentRoute = useLocation().pathname;
  return (
    <div className="space-x-2 bg-white p-6 border-dashed border-gray-300 border not-prose">
      <div className="space-y-2 w-full">
        <div className="flex justify-between">
          <Dropdown
            right={true}
            onClick={() => alert("Dropdown click")}
            button={<div>Dropdown</div>}
            options={
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => alert("Clicked")}
                      className={clsx("w-full text-left", active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
                    >
                      Button
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link to={currentRoute} className={clsx("w-full", active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}>
                      <div>Link</div>
                    </Link>
                  )}
                </Menu.Item>
              </div>
            }
          ></Dropdown>
          <Dropdown
            onClick={() => alert("Dropdown click")}
            button={<div>Dropdown</div>}
            options={
              <div>
                <button
                  type="button"
                  className="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none"
                  tabIndex={-1}
                  onClick={() => alert("Clicked")}
                >
                  <div>Button</div>
                </button>
                <Link to={currentRoute} className="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none" tabIndex={-1}>
                  <div>Link</div>
                </Link>
              </div>
            }
          ></Dropdown>
        </div>
      </div>
    </div>
  );
}
