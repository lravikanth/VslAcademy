import { AlertifyService } from 'src/app/common/alertify-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import {BehaviorSubject} from  'rxjs';
import { BreadCrum } from 'src/app/common/bread-crum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

jwtHealper = new JwtHelperService();
baseUrl =  environment.apiUrl + 'auth/';
decodedToken: any;
arr: BreadCrum[] = [{name: '', path: ''}];
userInPage = new BehaviorSubject<BreadCrum[]>(this.arr);
currentPage = this.userInPage.asObservable();

constructor(private http: HttpClient, private alert: AlertifyService) {

 }

 changeCurrentPage(current : BreadCrum[]) {
  this.userInPage.next(current);
 }

 login(model: any) {
   return this.http.post(this.baseUrl + 'login', model)
   .pipe (
     map((response: any) => {
       const user = response;
       if (user) {
         localStorage.setItem('token', user.token);
         this.decodedToken = this.jwtHealper.decodeToken(user.token);
        }
      } )
   )
   ;
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHealper.isTokenExpired(token);
}

getUserName() {
  const decodedToken = this.jwtHealper.decodeToken(localStorage.getItem('token'));
  return decodedToken?.nameid;
}

getUserId() {
  const decodedToken = this.jwtHealper.decodeToken(localStorage.getItem('token'));
  return decodedToken?.nameid;
}

getUserRole() {
  const decodedToken = this.jwtHealper.decodeToken(localStorage.getItem('token'));
  return decodedToken?.role;
} 

getFirstLastName(){
  const decodedToken = this.jwtHealper.decodeToken(localStorage.getItem('token'));
  return decodedToken?.unique_name;
}

hasAccessTo(str: string) {
  
  const decodedToken = this.jwtHealper.decodeToken(localStorage.getItem('token'));
  return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']?.indexOf(str) > -1;
}


getPermissions() {
  let token = localStorage.getItem('token');
  let decodedToken = this.jwtHealper.decodeToken(token);
}

register(user: User) {
  return this.http.post(this.baseUrl + 'register', user);
}

logout() {
    this.alert.success('Logged out successfully!!');
    localStorage.removeItem('token');
}

}
