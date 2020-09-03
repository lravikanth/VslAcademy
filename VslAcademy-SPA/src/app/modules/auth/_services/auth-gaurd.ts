import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './authService';
import { AlertifyService } from 'src/app/common/alertify-service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private route: Router,private alert: AlertifyService, private auth: AuthService) {}

  canActivate(
    next?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("from auth gaurd: " + this.auth.loggedIn());
      let routerStateSnapshot = this.route.routerState.snapshot;
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.alert.error('Invalid navigation!!. Please login.');
      this.route.navigate(['/auth'], {queryParams: {returnUrl: routerStateSnapshot.url}});
      return false;
    }
  }
}
