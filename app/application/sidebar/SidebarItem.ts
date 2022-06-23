import { TenantUserType } from "../enums/tenants/TenantUserType";
import { SvgIcon } from "../enums/shared/SvgIcon";
import { ReactNode } from "react";

export interface SideBarItem {
  title: string;
  path: string;
  icon?: SvgIcon;
  description?: string;
  open?: boolean;
  items?: SideBarItem[];
  side?: ReactNode;
  exact?: boolean;
}