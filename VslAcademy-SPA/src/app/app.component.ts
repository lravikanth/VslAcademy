import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/modules/auth/_services/authService';
import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SplashScreenService } from './common/splash-screen/splash-screen.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  timer = 0;
  jwthelper = new JwtHelperService();
  constructor(
    private splashScreenService: SplashScreenService,
    private router: Router,
    private auth: AuthService
    
  ) {

  }
    // register translations
   

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.auth.decodedToken = this.jwthelper.decodeToken(token);
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // hide splash screen
        this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
        }, 500);
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  

}
