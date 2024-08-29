import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarehousesPage } from './warehouses.page';

const routes: Routes = [
  {
    path: '',
    component: WarehousesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehousesPageRoutingModule {}
