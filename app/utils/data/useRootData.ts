import { json } from "remix";
import { Language } from "remix-i18next";
import { Command } from "~/application/dtos/layout/Command";
import { i18nHelper } from "~/locale/i18n.utils";
import { getUserInfo, UserSession } from "../session.server";
import CommandUtils from "../shared/CommandUtils";
import { useMatches } from "@remix-run/react";

export type AppRootData = {
  title: string;
  i18n: Record<string, Language>;
  userSession: UserSession;
  debug: boolean;
  commands: Command[];
};

export function useRootData(): AppRootData {
  return (useMatches().find((f) => f.pathname === "/" || f.pathname === "")?.data ?? {}) as AppRootData;
}

export async function loadRootData(request: Request) {
  let { translations } = await i18nHelper(request);
  const userSession = await getUserInfo(request);
  const commands = CommandUtils.getCommands();
  const data: AppRootData = {
    title: `${process.env.APP_NAME}`,
    i18n: translations,
    userSession,
    debug: process.env.NODE_ENV === "development",
    commands,
  };
  return json(data);
}
