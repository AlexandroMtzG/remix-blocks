import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { URLSearchParams } from "url";
// import { jitsu } from "./jitsu.server";

export type UserSession = {
  userId: string;
  lightOrDarkMode: string;
  lng: string;
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserInfo(request: Request): Promise<UserSession> {
  // jitsu.track(request.url).catch(() => {});

  const session = await getUserSession(request);
  const userId = session.get("userId") ?? "";
  const lightOrDarkMode = session.get("lightOrDarkMode") ?? "";
  const lng = session.get("lng") ?? "en";
  return {
    userId,
    lightOrDarkMode,
    lng,
  };
}

export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function createUserSession(userSession: UserSession, redirectTo: string = "") {
  const session = await storage.getSession();
  session.set("userId", userSession.userId);
  session.set("lightOrDarkMode", userSession.lightOrDarkMode);
  session.set("lng", userSession.lng);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
