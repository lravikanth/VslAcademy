import { AlertifyService } from 'src/app/common/alertify-service';
import { MathSkillsService } from './../../../../_services/math-skills.service';
import { EditSubDomainComponent } from './../edit-SubDomain/edit-SubDomain.component';
import { MathSubdomain } from './../../../../_models/math-subdomain';
import { EditDomainComponent } from './../edit-domain/edit-domain.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BreadCrum } from 'src/app/common/bread-crum';
import { AuthService } from 'src/app/modules/auth/_services/authService';
import { ActivatedRoute } from '@angular/router';
import { MathDomain } from 'src/app/_models/math-domain';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-manage-domains',
  templateUrl: './manage-domains.component.html',
  styleUrls: ['./manage-domains.component.scss']
})
export class ManageDomainsComponent implements OnInit {
  isEditing = false;
  panelOpenState: false;
  domainList: MathDomain[];
  schoolGrades: any;
  
  constructor( private auth: AuthService, private route: ActivatedRoute, private ref: ChangeDetectorRef,
    private modal: NgbModal, private mathService: MathSkillsService, private alert: AlertifyService) { }

  ngOnInit() {
    const arr: BreadCrum[] = [{name: 'Course Mangement', path: '/managedomains'}, {name: 'Courses', path: '/managedomains'}];
    this.auth.changeCurrentPage(arr);
    this.route.data.subscribe(data => {
      this.domainList = data.domainData;
    });

    this.mathService.getMathSchoolGrades(this.auth.getUserId()).subscribe(data => {
      this.schoolGrades = data;
    });
  }

  reLoadDomainData() {
    console.log('reload called');
     this.mathService.getMathDomains(this.auth.getUserId()).subscribe(data => {
      this.domainList = data;
      this.ref.detectChanges();
     },error => {
      this.alert.error('Problem rerieving math domain data.');
     });
  }

  addDomain() {
    const newdomain = new MathDomain();
    newdomain.id = 0;
    this.editDomain( newdomain);
  }

  editDomain(domain: MathDomain) {
    const ref = this.modal.open(EditDomainComponent);
    ref.componentInstance.domain = domain;

    ref.result.then((yes) => {
      if (domain.id !== 0) {
      console.log(yes);
      this.domainList.find(x=>  {
        if (x.id === yes.id) {
          x.domain = yes.domain;
        }
       });
    } else {
        this.reLoadDomainData();
    }
  }
     , (cancel) => {
      console.log('click NO');
    });
  }

  del(id: number) {
    console.log(id);
  }

  editSubDomain(str: string, subDomain: MathSubdomain) {
    const ref = this.modal.open(EditSubDomainComponent, {ariaLabelledBy: 'modal-basic-title',
    size: 'lg'});
    ref.componentInstance.subDomain = subDomain;
    ref.componentInstance.domain = str;
    ref.componentInstance.schoolGrades = this.schoolGrades;
    
    ref.result.then((yes) => {
      this.domainList.find(x => x.id === subDomain.mathDomainId).mathSubDomains.find(y=> {
        if (y.id === subDomain.id) {
          y.subDomain = yes.subDomain;
        }
      });
      console.log(yes);
    }, (cancel) => {
      console.log('click NO');
    });
  }

  delsubDomain() {

  }

  delDomain() {
    
  }
}
