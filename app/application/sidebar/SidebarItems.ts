import { getAllBlocksByGroup } from "~/components/blocks/BlockItems";
import { SideBarItem } from "./SidebarItem";
export const SidebarItems: SideBarItem[] = [
  {
    title: "",
    path: "/",
    exact: true,
    items: [
      {
        title: "Introduction",
        path: "/",
        exact: true,
      },
    ],
  },
  {
    title: "Blocks",
    path: "/blocks",
    items: [
      {
        title: "All blocks",
        path: "/blocks/all",
        exact: true,
      },
      ...getAllBlocksByGroup(true),
    ],
  },
  {
    title: "UI",
    path: "",
    items: [
      {
        title: "Pages",
        path: "",
        items: [
          {
            title: "404",
            path: "/404",
          },
          {
            title: "401",
            path: "/401",
          },
        ],
      },
      {
        title: "Components",
        path: "/components",
        items: [
          {
            title: "Buttons",
            path: "/components/buttons",
          },
          {
            title: "Badges",
            path: "/components/badges",
          },
          {
            title: "Banners",
            path: "/components/banners",
          },
          {
            title: "Breadcrumbs",
            path: "/components/breadcrumbs",
          },
          {
            title: "Command Palette",
            path: "/components/command-palette",
          },
          {
            title: "Dropdowns",
            path: "/components/dropdowns",
          },
          {
            title: "Empty States",
            path: "/components/empty-states",
          },
          {
            title: "Forms",
            path: "/components/forms",
          },
          // {
          //   title: "Layouts",
          //   path: "/components/layouts",
          //
          // },
          {
            title: "Loaders",
            path: "/components/loaders",
          },
          {
            title: "Modals",
            path: "/components/modals",
          },
          {
            title: "PDF Viewer",
            path: "/components/pdf-viewer",
          },
          {
            title: "Tables",
            path: "/components/tables",
          },
          {
            title: "Tabs",
            path: "/components/tabs",
          },
          {
            title: "Tooltips",
            path: "/components/tooltips",
          },
          {
            title: "Uploaders",
            path: "/components/uploaders",
          },
          {
            title: "Logo and Icon",
            path: "/components/logo-and-icon",
          },
          // {
          //   title: "Inputs",
          //   path: "/components/inputs",
          //
          //   items: [
          {
            title: "Input - Text",
            path: "/components/inputs/text",
          },
          {
            title: "Input - Number",
            path: "/components/inputs/number",
          },
          {
            title: "Input - Date",
            path: "/components/inputs/date",
          },
          {
            title: "Input - Selector",
            path: "/components/inputs/selector",
          },
          {
            title: "Input - Checkbox",
            path: "/components/inputs/checkbox",
          },
          {
            title: "Input - RadioGroup",
            path: "/components/inputs/radio-group",
          },
          // ],
          // },
        ],
      },
    ],
  },
];
