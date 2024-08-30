import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreasPage } from './areas.page';

const routes: Routes = [
  {
    path: '',
    component: AreasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasPageRoutingModule {}
