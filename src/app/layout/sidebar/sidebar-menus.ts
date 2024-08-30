import { RoutersEnum } from 'src/shared/utils/routers-enum';

const home = {
  text: 'Início',
  link: RoutersEnum.home,
  icon: 'home',
};
const areas = {
  text: 'Áreas',
  link: RoutersEnum.app + '/' + RoutersEnum.areas,
  icon: 'cube',
};
const warehouses = {
  text: 'Almoxarifados',
  link: RoutersEnum.app + '/' + RoutersEnum.warehouses,
  svg: 'assets/svgs/warehouse-icon.svg',
};

export const sidebarMenu = [home, areas, warehouses];
