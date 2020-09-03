import { AuthGuard } from './modules/auth/_services/auth-gaurd';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  // ,
  // {
  //   path: 'error',
  //   loadChildren: () =>
  //     import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  // },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/default-home/default-home.module').then((m) => m.DefaultHomeModule),
  },
  // { path: '**', redirectTo: 'errors/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
