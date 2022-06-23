import { Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import { useEscapeKeypress } from "~/utils/shared/KeypressUtils";
import clsx from "clsx";

type size = "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
interface Props {
  title?: string;
  size?: size;
  paddingContent?: string;
  paddingY?: string;
  content?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  onClose: () => void;
}

export default function SlideOver({ title = "", size = "md", paddingContent = "px-4 sm:px-6", paddingY = "py-6", onClose, content, footer }: Props) {
  const [open] = useState(true);

  useEscapeKeypress(onClose);
  return (
    <div>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden z-10">
        <div className="absolute inset-0 overflow-hidden">
          <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition
              show={open}
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div
                className={clsx(
                  "w-screen max-w-sm",
                  size === "md" ?? "md:max-w-md",
                  size === "lg" ?? "md:max-w-lg",
                  size === "2xl" ?? "md:max-w-2xl",
                  size === "3xl" ?? "md:max-w-3xl",
                  size === "4xl" ?? "md:max-w-4xl",
                  size === "full" ?? "md:max-w-full"
                )}
              >
                <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-2xl">
                  <div className={clsx(paddingY, "h-0 flex-1 space-y-6 overflow-y-scroll")}>
                    {title && (
                      <header className="px-4 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <h2 className="text-lg leading-7 font-medium text-gray-900">{title}</h2>
                          <div className="h-7 flex items-center">
                            <button
                              onClick={() => onClose()}
                              aria-label="Close panel"
                              className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                            >
                              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </header>
                    )}
                    <div className={clsx(paddingContent, "relative flex-1")}>
                      {/*Replace with your content */}
                      {content && <div>{content}</div>}
                      {footer && <div className="flex-shrink-0 px-1 py-4 space-x-4 flex justify-end border-t border-gray-200">{footer}</div>}
                      {/* <slot name="footer" className="flex-shrink-0 px-1 py-4 space-x-4 flex justify-end border-t border-gray-200"></slot> */}
                      {/*/End replace */}
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </section>
        </div>
        <div className="absolute top-4 right-10">
          {!title && (
            <button
              onClick={() => onClose()}
              className="flex items-center space-x-1 py-1 px-2 text-xs uppercase hover:bg-gray-200 rounded-md shadow-lg bg-white border border-gray-300 text-gray-800 font-extrabold"
            >
              <div>Close</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
