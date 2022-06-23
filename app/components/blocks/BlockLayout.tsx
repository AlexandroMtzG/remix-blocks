import { ReactNode } from "react";
import { useLocation } from "remix";
import BreadcrumbSimple from "../ui/breadcrumbs/BreadcrumbSimple";
import ButtonTertiary from "../ui/buttons/ButtonTertiary";
import BlockDemoCodeToggle from "./BlockDemoCodeToggle";
import { BlockItem } from "./BlockItems";

interface Props {
  item: BlockItem;
  children: ReactNode;
  details?: ReactNode;
  className?: string;
}
export default function BlockLayout({ item, children, details, className = "max-w-md mx-auto" }: Props) {
  const location = useLocation();

  // const [copied, setCopied] = useState(false);

  // function copy() {
  //   setCopied(true);
  //   navigator.clipboard.writeText("code");
  // }

  return (
    <div className="not-prose space-y-2">
      <div>
        <BreadcrumbSimple
          menu={[
            {
              title: "Blocks",
              routePath: "/blocks/all",
            },
            {
              title: item.group,
              routePath: "",
            },
            {
              title: item.title,
              routePath: item.path + "",
            },
          ]}
        />
        <div className="sm:flex items-center sm:space-x-2 justify-between">
          <h3 className="font-bold text-2xl truncate">{item.title}</h3>
          <div className="flex items-center space-x-2">
            <div>
              <BlockDemoCodeToggle />
            </div>
            <div className="hidden md:block">
              <ButtonTertiary target="_blank" to={`https://github.com/AlexandroMtzG/remix-blocks/blob/main/app/routes${item.path}/index.tsx`} className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-500 hover:text-theme-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                {/* {!copied ? (
                  <ClipboardIcon className="h-5 w-5 text-theme-500 hover:text-theme-600" />
                ) : (
                  <ClipboardFilledIcon className="h-5 w-5 text-theme-500 hover:text-theme-600" />
                )} */}
              </ButtonTertiary>
            </div>
          </div>
        </div>
      </div>

      {details}

      {location.pathname.endsWith("code") ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">{children}</div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8">
          <div className={className}>{children}</div>
        </div>
      )}

      <div className="flex justify-end text-xs pt-2">
        <div>
          Sponsored by{" "}
          <a className="underline hover:text-theme-500" href="http://saasrock.com/">
            SaasRock
          </a>
        </div>
      </div>
    </div>
  );
}
