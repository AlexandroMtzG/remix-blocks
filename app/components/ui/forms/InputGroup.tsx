import { ReactNode } from "react";

interface Props {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  description?: string;
}
export default function InputGroup({ title, description, icon, children }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm leading-3 font-medium text-gray-800">
        <div className="flex space-x-1 items-center">
          {icon}
          <div>
            <span className=" italic font-light"></span> {title}
          </div>
        </div>
      </h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="bg-white py-5 px-4 shadow border border-gray-100 rounded-md">{children}</div>
    </div>
  );
}
