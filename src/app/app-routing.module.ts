import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { payloadGuard } from './guards/payload.guard';
import { LayoutPage } from './layout/layout.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
  {
    path: 'login',
    canActivate: [],
    loadChildren: () =>
      import('./routes/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'app',
    canActivateChild: [payloadGuard],
    component: LayoutPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        canActivate: [],
        loadChildren: () =>
          import('./routes/home/home.module').then((m) => m.HomePageModule),
      },
    ],
  },
  { path: '**', redirectTo: 'app' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
