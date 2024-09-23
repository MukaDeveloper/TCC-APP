import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovimentationsPage } from './movimentations.page';

const routes: Routes = [
  {
    path: '',
    component: MovimentationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovimentationsPageRoutingModule {}
