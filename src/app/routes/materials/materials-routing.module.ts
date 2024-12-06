import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialsPage } from './materials.page';
import { ERouters } from 'src/shared/utils/e-routers';

const routes: Routes = [
  {
    path: '',
    component: MaterialsPage,
  },
  {
    path: ERouters.addMaterial,
    loadChildren: () =>
      import('./add-material/add-material.module').then(
        (m) => m.AddMaterialPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialsPageRoutingModule {}
