export class IMenu {
  text: string;
  heading?: boolean;
  link: string;
  elink?: string;
  target?: string;
  icon?: string;
  alert?: string;
  submenu?: Array<ISubMenu>;
}
