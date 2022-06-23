import { Command } from "~/application/dtos/layout/Command";
import { SidebarItems } from "~/application/sidebar/SidebarItems";
import { SideBarItem } from "~/application/sidebar/SidebarItem";

function getCommands(): Command[] {
  const commands: Command[] = [];
  SidebarItems.forEach((item) => {
    commands.push(...getCommandsFromItem(item, [], []));
  });
  return commands;
}

function getCommandsFromItem(item: SideBarItem, commands: Command[], parent: string[]) {
  if (item.path && item.title && !item.hideFromCommandPalette) {
    let description = item.description ?? "";
    if (parent.length > 0) {
      description = parent.join(" / ");
    }
    commands.push({
      command: "",
      title: item.title,
      description,
      toPath: item.path,
    });
  }
  item.items?.forEach((subItem) => {
    return getCommandsFromItem(subItem, commands, [...parent, item.title]);
  });

  return commands;
}

export default {
  getCommands,
};
