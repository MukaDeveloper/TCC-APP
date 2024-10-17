import { EUserRole } from '../../payload/interfaces/enum/EUserRole';
import { ISubMenu } from './i-submenus';

export interface IMenu {
  text: string;
  heading?: boolean;
  link: string;
  elink?: string;
  target?: string;
  icon?: string;
  mode?: boolean;
  svg?: string;
  alert?: string;
  subMenu?: ISubMenu[];
  cannotAccess?: EUserRole;
}
