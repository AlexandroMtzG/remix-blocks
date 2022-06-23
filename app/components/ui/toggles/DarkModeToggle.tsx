import { useRootData } from "~/utils/data/useRootData";
import clsx from "~/utils/shared/ClassesUtils";
import { useLocation, useSubmit } from "@remix-run/react";

export default function DarkModeToggle({ className }: { className: string }) {
  const { userSession } = useRootData();
  let location = useLocation();
  const submit = useSubmit();

  const toggle = () => {
    const form = new FormData();
    form.set("action", "toggleLightOrDarkMode");
    form.set("redirect", location.pathname);
    submit(form, { method: "post", action: "/" });
  };
  const isDarkMode = userSession.lightOrDarkMode === "dark";

  return (
    <button type="button" onClick={toggle} className={clsx(className, "flex items-center justify-center space-x-2 w-full focus:outline-none group")}>
      <span className="text-base font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
      <div className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-500">
        <div className="w-6 h-3.5 transition bg-gray-500 rounded-full shadow-md outline-none"></div>
        <div
          className={`absolute inline-flex bg-white items-center justify-center w-1.5 h-1.5 transition-all duration-200 ease-in-out transform rounded-full shadow-sm top-1 left-1
                  ${isDarkMode ? "translate-x-3" : ""}`}
        ></div>
      </div>
      <span className="text-base font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>
    </button>
  );
}
