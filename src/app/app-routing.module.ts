import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoutersEnum } from '../shared/utils/routers-enum';
import { payloadGuard } from './guards/payload.guard';
import { toHomeGuard } from './guards/to-home.guard';
import { LayoutPage } from './layout/layout.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutersEnum.app,
  },
  {
    path: 'register',
    loadChildren: () => import('./routes/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: RoutersEnum.login,
    canActivate: [toHomeGuard],
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: RoutersEnum.app,
    canActivateChild: [payloadGuard],
    component: LayoutPage,
    children: [
      {
        path: '',
        redirectTo: RoutersEnum.home,
        pathMatch: 'full',
      },
      {
        path: RoutersEnum.home,
        canActivate: [],
        loadChildren: () =>
          import('./routes/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: RoutersEnum.events,
        loadChildren: () =>
          import('./routes/events/events.module').then(
            (m) => m.EventsPageModule
          ),
      },
      {
        path: RoutersEnum.warehouses,
        loadChildren: () =>
          import('./routes/warehouses/warehouses.module').then(
            (m) => m.WarehousesPageModule
          ),
      },
      {
        path: RoutersEnum.areas,
        loadChildren: () =>
          import('./routes/areas/areas.module').then((m) => m.AreasPageModule),
      },
      {
        path: RoutersEnum.materials,
        loadChildren: () =>
          import('./routes/materials/materials.module').then(
            (m) => m.MaterialsPageModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: RoutersEnum.app },  {
    path: 'membros',
    loadChildren: () => import('./routes/membros/membros.module').then( m => m.MembrosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
