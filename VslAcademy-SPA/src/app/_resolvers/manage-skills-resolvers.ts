import { AuthService } from 'src/app/modules/auth/_services/authService';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../common/alertify-service';
import { MathSkillsService } from '../_services/math-skills.service';
import {Injectable} from '@angular/core';
import { MathDomain } from '../_models/math-domain';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class ManageSkillsResolver implements Resolve<MathDomain[]> {
    constructor(private mathSkillService: MathSkillsService, private router: Router, 
                private alertify: AlertifyService, private auth: AuthService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<MathDomain[]> {
        console.log(this.auth.getUserId());
        return this.mathSkillService.getMathDomains(this.auth.getUserId()).pipe(
            catchError(error => {
                this.alertify.error('Problem rerieving math domain data.');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }


}