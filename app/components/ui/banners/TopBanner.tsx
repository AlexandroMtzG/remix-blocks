import clsx from "clsx";
import { useState } from "react";

interface Props {
  message: string;
  cta?: {
    message: string;
    link: string;
  };
}
export default function TopBanner({ message, cta }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <span>
      {open && (
        <div className="bg-slate-900 border-b-2 border-theme-500 shadow-2xl">
          <div className="max-w-7xl mx-auto py-1.5 sm:py-3 px-3 sm:px-6 lg:px-8">
            <div className="w-full lg:w-auto lg:justify-end flex items-center space-x-3">
              <div className={clsx("flex-grow flex", cta ? "justify-start" : "justify-center")}>
                <div className="flex font-medium space-x-1 items-baseline text-white text-sm sm:text-base">{message}</div>
              </div>
              {cta && (
                <div className="flex flex-shrink-0 order-2 mt-0 w-auto">
                  <a
                    href={cta.link}
                    className="flex items-center justify-center space-x-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-theme-900 bg-theme-400 hover:bg-theme-500"
                  >
                    <span>{cta.message}</span>
                  </a>
                </div>
              )}
              <div className="hidden sm:flex flex-shrink-0 order-3 ml-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="-mr-1 flex p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-400 sm:-mr-2"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6 text-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}
