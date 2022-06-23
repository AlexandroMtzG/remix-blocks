import clsx from "clsx";
import { Link, useParams } from "remix";
import UrlUtils from "~/utils/app/UrlUtils";
import RightIcon from "../icons/RightIcon";

interface MenuItem {
  title: string;
  routePath?: string;
}

interface Props {
  menu: MenuItem[];
  className?: string;
  home?: string;
}

export default function BreadcrumbSimple({ menu = [], className = "", home = "" }: Props) {
  const params = useParams();
  return (
    <nav className={clsx("flex not-prose truncate", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {home && (
          <li className="truncate">
            <div>
              <Link to={home.length > 0 ? home : UrlUtils.currentTenantUrl(params, "dashboard")} className="text-gray-300 hover:text-gray-400">
                <svg className="flex-shrink-0 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
        )}
        {menu.map((item, idx) => (
          <li key={item.title} className="truncate">
            <div className="flex items-center">
              {(idx > 0 || home) && <RightIcon className="flex-shrink-0 h-4 w-4 text-gray-400" />}
              {item.routePath ? (
                <Link to={item.routePath} className="ml-1 text-sm font-normal text-gray-400 hover:text-gray-600 select-none">
                  {item.title}
                </Link>
              ) : (
                <span className="ml-1 text-sm font-normal text-gray-400 select-none">{item.title}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
