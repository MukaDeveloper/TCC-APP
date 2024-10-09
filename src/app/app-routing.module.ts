import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ERouters } from '../shared/utils/e-routers';
import { payloadGuard } from './guards/payload.guard';
import { toHomeGuard } from './guards/to-home.guard';
import { LayoutPage } from './layout/layout.page';
import { institutionGuard } from './guards/institution.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ERouters.app,
  },
  {
    path: ERouters.register,
    loadChildren: () =>
      import('./routes/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: ERouters.login,
    canActivate: [toHomeGuard],
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: ERouters.forgotPassword,
    loadChildren: () =>
      import('./routes/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordPageModule),
  },
  {
    path: ERouters.app,
    canActivateChild: [payloadGuard, institutionGuard],
    component: LayoutPage,
    children: [
      {
        path: '',
        redirectTo: ERouters.home,
        pathMatch: 'full',
      },
      {
        path: ERouters.home,
        canActivate: [],
        loadChildren: () =>
          import('./routes/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: ERouters.events,
        loadChildren: () =>
          import('./routes/events/events.module').then(
            (m) => m.EventsPageModule
          ),
      },
      {
        path: ERouters.warehouses,
        loadChildren: () =>
          import('./routes/warehouses/warehouses.module').then(
            (m) => m.WarehousesPageModule
          ),
      },
      {
        path: ERouters.areas,
        loadChildren: () =>
          import('./routes/areas/areas.module').then((m) => m.AreasPageModule),
      },
      {
        path: ERouters.materials,
        loadChildren: () =>
          import('./routes/materials/materials.module').then(
            (m) => m.MaterialsPageModule
          ),
      },
      {
        path: ERouters.members,
        loadChildren: () =>
          import('./routes/membros/membros.module').then(
            (m) => m.MembrosPageModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: ERouters.app },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
