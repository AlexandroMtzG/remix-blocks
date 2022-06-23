import { ReactNode } from "react";
import { useLocation } from "remix";
import BreadcrumbSimple from "../ui/breadcrumbs/BreadcrumbSimple";
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
        <div className="flex items-center space-x-2 justify-between">
          <h3 className="font-bold text-2xl truncate">{item.title}</h3>
          <div className="flex items-center space-x-2">
            <div>
              <BlockDemoCodeToggle />
            </div>
            {/* <div className="hidden md:block">
              <ButtonTertiary onClick={copy} className="p-1">
                {!copied ? (
                  <ClipboardIcon className="h-5 w-5 text-theme-500 hover:text-theme-600" />
                ) : (
                  <ClipboardFilledIcon className="h-5 w-5 text-theme-500 hover:text-theme-600" />
                )}
              </ButtonTertiary>
            </div> */}
          </div>
        </div>
      </div>

      {details}

      {location.pathname.endsWith("code") ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">{children}</div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <div className={className}>{children}</div>
        </div>
      )}

      <div className="flex justify-end text-xs pt-2">
        <div>
          Brought to you by{" "}
          <a className="underline hover:text-theme-500" href="http://saasrock.com/">
            SaasRock
          </a>
        </div>
      </div>
    </div>
  );
}
