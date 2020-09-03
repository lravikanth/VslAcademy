import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from '../auth-routing.module';
import { LoginHomeComponent } from './login-home/login-home.component';
//import { RegistrationComponent } from './registration/registration.component';
//import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
//import { LogoutComponent } from './logout/logout.component';
//import { AuthComponent } from './auth.component';
//import {TranslationModule} from '../i18n/translation.module';

@NgModule({
  declarations: [
     LoginComponent,
     LoginHomeComponent
    // RegistrationComponent,
    // ForgotPasswordComponent,
    // LogoutComponent,
    // AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule {}
