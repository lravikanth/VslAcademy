import { AlertifyService } from 'src/app/common/alertify-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import {BehaviorSubject} from  'rxjs';
import { MathDomain } from '../_models/math-domain';

@Injectable({
  providedIn: 'root'
})
export class MathSkillsService {

baseUrl =  environment.apiUrl ;

constructor(private http: HttpClient, private alert: AlertifyService) { }

getMathDomains(userId: number) {
  return this.http.get<MathDomain[]>(this.baseUrl + userId + '/mathdomain/');
}
getMathSchoolGrades(userId: number) {
  return this.http.get(this.baseUrl + userId + '/mathdomain/schoolGrades');
}

updateMathSubDomain(userId: number,subDomainId : number, model: any) {
  return this.http.post(this.baseUrl + userId + '/mathdomain/subdomain/' + subDomainId,model);
}

getSubDomain(userId: number,subDomainId : number) {
  return this.http.get(this.baseUrl + userId + '/mathdomain/subdomain/' + subDomainId);
}

getSubDomains(userId: number,subDomainId : number, gradeId: number) {
  return this.http.get(this.baseUrl + userId + '/mathdomain/subdomains/' + subDomainId + '/' + gradeId);
}


getSkills(userId: number,subDomainId : number, gradeId: number) {
  return this.http.get(this.baseUrl + userId + '/skills/' + subDomainId+ '/' + gradeId);
}

getSkill(userId: number,skillId : number) {
  return this.http.get(this.baseUrl + userId + '/skills/' + skillId);
}
updateSkill(userId: number, skillModel: any) {
  return this.http.put(this.baseUrl + userId + '/skills/',skillModel);
}
updateDomain(userId: number,domainId: number, strModel: string) {
  return this.http.put(this.baseUrl + userId + '/mathdomain/' + domainId,{strData: strModel});
}
}
