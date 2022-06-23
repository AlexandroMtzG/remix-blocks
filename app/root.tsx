import {
  LiveReload,
  Outlet,
  LinksFunction,
  Links,
  useCatch,
  MetaFunction,
  Meta,
  Scripts,
  ScrollRestoration,
  LoaderFunction,
  useLoaderData,
  ActionFunction,
} from "remix";
import styles from "./styles/app.css";
import { useSetupTranslations } from "remix-i18next";
import { createUserSession, getUserInfo } from "./utils/session.server";
import { loadRootData, useRootData } from "./utils/data/useRootData";
import FloatingLoader from "./components/ui/loaders/FloatingLoader";
import Page404 from "./components/pages/Page404";
import AppLayout from "./components/app/AppLayout";
import { Command } from "./application/dtos/layout/Command";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export let loader: LoaderFunction = async ({ request }) => {
  return loadRootData(request);
};

export const meta: MetaFunction = ({ data }) => {
  const description = `Ready-to-use Remix + Tailwind CSS routes and components.`;
  return {
    charset: "utf-8",
    title: data?.title,
    description,
    keywords: "remix,saas,tailwindcss,prisma,react,typescript,boilerplate,saas-kit,saas-boilerplate,stripe,postmark,admin-portal,app-dashboard,multi-tenancy",
    "og:title": "RemixBlocks | Ready-to-use Remix + Tailwind CSS routes and components",
    "og:type": "website",
    "og:url": "https://remixblocks.com",
    "og:image": "https://yahooder.sirv.com/remixblocks/seo/cover-dark.png",
    "og:card": "summary_large_image",
    "og:creator": "@AlexandroMtzG",
    "og:site": "https://remixblocks.com",
    "og:description": description,
    "twitter:image": "https://yahooder.sirv.com/remixblocks/seo/thumbnail.png",
    "twitter:card": "summary_large_image",
    "twitter:creator": "@AlexandroMtzG",
    "twitter:site": "@saas_rock",
    "twitter:title": "RemixBlocks",
    "twitter:description": description,
  };
};

function Document({ children }: { children: React.ReactNode; title?: string }) {
  let { userSession, debug } = useRootData();
  return (
    <html lang={userSession?.lng ?? "en"} className={userSession?.lightOrDarkMode === "dark" ? "dark" : ""}>
      <head>
        <Meta />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Links />
      </head>
      <body className="min-h-screen text-gray-800 dark:text-white bg-white dark:bg-slate-900 max-w-full max-h-full">
        {children}

        {!debug && (
          <>
            <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
            <noscript>
              <img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="privacy-friendly-simpleanalytics" referrerPolicy="no-referrer-when-downgrade" />
            </noscript>
          </>
        )}

        <LiveReload />
        <FloatingLoader />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const userInfo = await getUserInfo(request);
  const form = await request.formData();
  const action = form.get("action");
  const redirect = form.get("redirect")?.toString();
  if (action === "toggleLightOrDarkMode") {
    const current = userInfo.lightOrDarkMode ?? "dark";
    const lightOrDarkMode = current === "dark" ? "light" : "dark";
    return createUserSession(
      {
        userId: userInfo.userId,
        lng: userInfo.lng,
        lightOrDarkMode,
      },
      redirect
    );
  }
  if (action === "setLocale") {
    const lng = form.get("lng")?.toString() ?? "";
    return createUserSession(
      {
        userId: userInfo?.userId,
        lightOrDarkMode: userInfo?.lightOrDarkMode,
        lng,
      },
      redirect
    );
  }
};

export default function App() {
  let { lng, commands } = useLoaderData<{ lng: string; commands: Command[] }>();
  useSetupTranslations(lng ?? "en");
  return (
    <Document>
      <AppLayout commands={commands}>
        <div className="py-2 sm:py-4 px-4 sm:px-10 w-full">
          <div className="prose prose-indigo">
            <Outlet />
          </div>
        </div>
      </AppLayout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div>
        <h1>
          {caught.status === 404 ? (
            <Page404 />
          ) : (
            <div className="mx-auto p-12 text-center">
              {caught.status} {caught.statusText}
            </div>
          )}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const data = useRootData();
  return (
    <Document title="Unexpected error">
      <div className="mx-auto p-12 text-center">
        <h1>
          Server error,{" "}
          <button type="button" onClick={() => window.location.reload()} className="underline">
            please try again
          </button>
          <div className="flex flex-col space-y-1 text-left">
            <div>
              <span className="font-bold">Message:</span> {error.message}
            </div>
            <div>
              <span className="font-bold">Stack:</span> {error.stack}
            </div>
          </div>
        </h1>
      </div>
    </Document>
  );
}
