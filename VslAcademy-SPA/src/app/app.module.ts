import { ErrorInterceptorProvider } from './common/error-interceptor';
import { AuthService } from './modules/auth/_services/authService';
import { HttpClientModule } from '@angular/common/http';
import { AlertifyService } from './common/alertify-service';
import { CommonModule } from '@angular/common';
import { SplashScreenModule } from './common/splash-screen/splash-screen.module';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './modules/auth/_services/auth-gaurd';
import { MathDomainResolver } from './_resolvers/math-domain-resolvers';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SplashScreenModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['http://localhost:5000/api/auth']
      }
    }
  )
  ],
  providers: [
    AlertifyService, 
    AuthGuard, 
    AuthService,
    ErrorInterceptorProvider,
    MathDomainResolver
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
