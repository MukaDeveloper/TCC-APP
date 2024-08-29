import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoutersEnum } from '../shared/utils/routers-enum';
import { payloadGuard } from './guards/payload.guard';
import { LayoutPage } from './layout/layout.page';
import { toHomeGuard } from './guards/to-home.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutersEnum.app,
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
    ],
  },
  { path: '**', redirectTo: RoutersEnum.app },  {
    path: 'warehouses',
    loadChildren: () => import('./routes/warehouses/warehouses.module').then( m => m.WarehousesPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
