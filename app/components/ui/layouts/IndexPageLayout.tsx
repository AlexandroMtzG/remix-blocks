import { ReactNode } from "react";
import Tabs, { TabItem } from "../tabs/Tabs";

interface Props {
  title?: string;
  buttons?: ReactNode;
  children: ReactNode;
  tabs?: TabItem[];
}
export default function IndexPageLayout({ title, buttons, children, tabs }: Props) {
  return (
    <>
      {(title || buttons) && (
        <div className="bg-white shadow-sm border-b border-gray-300 w-full py-2">
          <div className="mx-auto max-w-5xl xl:max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 space-x-2">
            <h1 className="flex-1 font-bold flex items-center truncate">{title}</h1>
            {buttons && <div className="flex items-center space-x-2">{buttons}</div>}
          </div>
        </div>
      )}
      {tabs && (
        <div className="bg-white border-b border-gray-300 w-full py-2">
          <div className="mx-auto max-w-5xl xl:max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 space-x-2">
            <Tabs tabs={tabs} className="flex-grow" />
          </div>
        </div>
      )}
      <div className="pt-2 pb-6 space-y-2 max-w-5xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </>
  );
}
