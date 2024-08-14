import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout/layout.page';
import { RoutersEnum } from 'src/shared/utils/routers-enum';
import { payloadGuard } from './guards/payload.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutersEnum.app,
    pathMatch: 'full'
  },
  {
    path: RoutersEnum.login,
    canActivate: [],
    loadChildren: () => import('./routes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: RoutersEnum.app,
    component: LayoutPage,
    canActivate: [payloadGuard],
    children: [
      {
        path: '',
        redirectTo: RoutersEnum.login,
        pathMatch: 'full'
      },
      {
        path: RoutersEnum.home,
        canActivate: [],
        loadChildren: () => import('./routes/home/home.module').then(m => m.HomePageModule)
      },
    ]
  },
  { path: '**', redirectTo: RoutersEnum.app },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
