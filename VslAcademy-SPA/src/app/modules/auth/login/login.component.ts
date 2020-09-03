import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/authService';
import { AlertifyService } from 'src/app/common/alertify-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private alertify: AlertifyService,
              private cd: ChangeDetectorRef) { }

  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  testEmitter$ = new BehaviorSubject<boolean>(this.hasError);
  model: any = {};

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }
 
  submit() {
    {
      this.model.userName = this.loginForm.get('userName').value;
      this.model.password = this.loginForm.get('password').value;

      this.authService.login(this.model).subscribe(next => {
        this.router.navigate([this.returnUrl]);
        this.alertify.success('Logged in successfully!');
      }, error => {
        this.hasError = true;
        this.testEmitter$.next(this.hasError);
        this.cd.markForCheck();
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/dashboard']);
      } );
    }
  }

}
