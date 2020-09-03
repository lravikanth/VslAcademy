import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/_services/authService';
import { BreadCrum } from 'src/app/common/bread-crum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private auth: AuthService) { }

  ngOnInit() {
    let arr: BreadCrum[] = [{name: 'DashBoard', path: '/dashboard'}];
    this.auth.changeCurrentPage(arr);
  }

}
