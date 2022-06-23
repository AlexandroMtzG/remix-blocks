import { ReactNode } from "react";
import { useParams } from "remix";
import BreadcrumbSimple from "../breadcrumbs/BreadcrumbSimple";

interface Props {
  title: string;
  menu?: {
    title: string;
    routePath?: string;
  }[];
  buttons?: ReactNode;
  children: ReactNode;
}
export default function EditPageLayout({ title, menu, buttons, children }: Props) {
  const params = useParams();
  const home = params.tenant ? `/app/${params.tenant}/dashboard` : "/admin/dashboard";
  return (
    <div className="pt-3 pb-6 max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between space-x-2">
          <h1 className="flex-1 font-medium flex items-center truncate text-xl">{title}</h1>
          <div className="flex items-center space-x-2">{buttons}</div>
        </div>

        {menu && <BreadcrumbSimple home={home} menu={menu} />}
      </div>

      {children}
    </div>
  );
}
