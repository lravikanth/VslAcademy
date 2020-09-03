import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginHomeComponent} from './auth/login-home/login-home.component';
import { LoginComponent } from './auth/login/login.component';
// import {RegistrationComponent} from './registration/registration.component';
// import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
// import {LogoutComponent} from './logout/logout.component';


const routes: Routes = [
  {
    path: '',
    component: LoginHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {returnUrl: window.location.pathname}
      }
    //   },
    //   {
    //     path: 'registration',
    //     component: RegistrationComponent
    //   },
    //   {
    //     path: 'forgot-password',
    //     component: ForgotPasswordComponent
    //   },
    //   {
    //     path: 'logout',
    //     component: LogoutComponent
    //   },
    //   {path: '', redirectTo: 'login', pathMatch: 'full'},
    //   {path: '**', redirectTo: 'login', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
