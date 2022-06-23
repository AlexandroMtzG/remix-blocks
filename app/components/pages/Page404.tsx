import { useNavigate } from "@remix-run/react";
import Logo from "../front/Logo";

export default function Page404() {
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <div className="min-h-full pt-16 pb-12 flex flex-col">
          <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 flex justify-center">
              <Logo />
            </div>
            <div className="py-16">
              <div className="text-center">
                <p className="text-sm font-semibold text-theme-600 uppercase tracking-wide">Not found</p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Page not found.</h1>
                <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-4 flex">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-sm font-medium text-theme-600 dark:text-theme-400 hover:text-theme-500 w-full text-center"
                  >
                    <span aria-hidden="true"> &larr;</span> Go back
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
