import { ISubMenu } from "./i-submenus";

export interface IMenu {
  text: string;
  heading?: boolean;
  link: string;
  elink?: string;
  target?: string;
  icon?: string;
  alert?: string;
  submenu?: ISubMenu[];
}
