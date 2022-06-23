import { useLocation } from "@remix-run/react";
import Breadcrumb from "./Breadcrumb";
import BreadcrumbSimple from "./BreadcrumbSimple";

export default function PreviewBreadcrumbs() {
  const currentRoute = useLocation().pathname;
  return (
    <div id="breadcrumbs" className="w-full not-prose">
      <h3 className="font-medium text-sm">Breadcrumb</h3>
      <div className="flex items-center space-x-2 p-2 border-dashed border-gray-300 border">
        <Breadcrumb
          className="w-full"
          home="/"
          menu={[
            { title: "Docs", routePath: "/docs" },
            { title: "Components", routePath: "/components" },
            { title: "Breadcrumbs", routePath: currentRoute },
          ]}
        />
      </div>

      <h3 className="font-medium text-sm">BreadcrumbSimple</h3>
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <BreadcrumbSimple
          className="w-full not-prose"
          home="/"
          menu={[
            { title: "Docs", routePath: "/docs" },
            { title: "Components", routePath: "/components" },
            { title: "Breadcrumbs", routePath: currentRoute },
          ]}
        />
      </div>
    </div>
  );
}
