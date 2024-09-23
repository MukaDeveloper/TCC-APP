import { RoutersEnum } from 'src/shared/utils/routers-enum';
import { EUserRole } from '../../../services/payload/interfaces/enum/EUserRole';

const home = {
  text: 'Início',
  link: RoutersEnum.home,
  icon: 'home',
};
const movimentations = {
  text: 'Eventos',
  link: RoutersEnum.app + '/' + RoutersEnum.events,
  icon: 'sync',
  cannotAccess: [EUserRole.USER, EUserRole.WAREHOUSEMAN],
};
const areas = {
  text: 'Áreas',
  link: RoutersEnum.app + '/' + RoutersEnum.areas,
  icon: 'cube',
  cannotAccess: [EUserRole.USER],
};
const warehouses = {
  text: 'Almoxarifados',
  link: RoutersEnum.app + '/' + RoutersEnum.warehouses,
  svg: 'assets/svgs/warehouse-icon.svg',
  cannotAccess: [EUserRole.USER],
};
const materials = {
  text: 'Materiais',
  link: RoutersEnum.app + '/' + RoutersEnum.materials,
  icon: 'archive',
  cannotAccess: [],
};

export const sidebarMenu = [home, movimentations, areas, warehouses, materials];
