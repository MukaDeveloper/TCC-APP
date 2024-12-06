import { ERouters } from 'src/shared/utils/e-routers';
import { EUserRole } from '../../../services/payload/interfaces/enum/EUserRole';

const home = {
  text: 'Solicitações',
  link: ERouters.home,
  icon: 'cloud-download-outline',
  mode: true,
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
  icon: 'home',
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
  members,
  movimentations,
  areas,
  warehouses,
  materials,
];
