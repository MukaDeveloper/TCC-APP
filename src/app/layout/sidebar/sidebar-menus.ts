import { ERouters } from 'src/shared/utils/e-routers';
import { EUserRole } from '../../../services/payload/interfaces/enum/EUserRole';

const home = {
  text: 'Início',
  link: ERouters.home,
  icon: 'home',
};
const movimentations = {
  text: 'Eventos',
  link: ERouters.app + '/' + ERouters.events,
  icon: 'sync',
  cannotAccess: [EUserRole.USER, EUserRole.WAREHOUSEMAN],
};
const areas = {
  text: 'Áreas',
  link: ERouters.app + '/' + ERouters.areas,
  icon: 'cube',
  cannotAccess: [EUserRole.USER, EUserRole.WAREHOUSEMAN],
};
const warehouses = {
  text: 'Almoxarifados',
  link: ERouters.app + '/' + ERouters.warehouses,
  svg: 'assets/svgs/warehouse-icon.svg',
  cannotAccess: [EUserRole.USER],
};
const materials = {
  text: 'Materiais',
  link: ERouters.app + '/' + ERouters.materials,
  icon: 'archive',
  cannotAccess: [],
};
const members = {
  text: 'Membros',
  link: ERouters.app + '/' + ERouters.members,
  icon: 'people',
  cannotAccess: [EUserRole.USER, EUserRole.WAREHOUSEMAN],
};

export const sidebarMenu = [
  home,
  movimentations,
  areas,
  warehouses,
  materials,
  members,
];
