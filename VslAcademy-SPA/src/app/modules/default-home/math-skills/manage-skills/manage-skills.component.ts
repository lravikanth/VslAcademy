import { AddEditSkillComponent } from '../add-edit-skill/add-edit-skill.component';
import { MathSubdomain } from './../../../../_models/math-subdomain';
import { MathDomain } from 'src/app/_models/math-domain';
import { AlertifyService } from './../../../../common/alertify-service';
import { MathSkillsService } from './../../../../_services/math-skills.service';
import { AuthService } from 'src/app/modules/auth/_services/authService';
import { Component, OnInit, ApplicationRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BreadCrum } from 'src/app/common/bread-crum';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-manage-skills',
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageSkillsComponent implements OnInit {

  skills: any[];
  domains: MathDomain[];
  subDomain: MathSubdomain[];
  grades: any[];
  selectedDomain: number;
  selectedSubDomain: number;
  selectedGrade: number;
  skillsForm: FormGroup;
  allValuesSelected: boolean;
  selectSubdomainText: string;

  constructor(private auth: AuthService, private mathSkills: MathSkillsService, private alert: AlertifyService,
              private route: ActivatedRoute,private ref: ChangeDetectorRef, public modal: NgbModal) { }

  ngOnInit() {

    const arr: BreadCrum[] = [{name: 'Course Mangement', path: '/managedomains'}, {name: 'Courses', path: '/managedomains'}];
    this.auth.changeCurrentPage(arr);
    this.route.data.subscribe(data => {
      this.domains = data.searchLkp;
      console.log(this.domains);
    });

    this.mathSkills.getMathSchoolGrades(this.auth.getUserId()).subscribe((data : any[]) => {
      this.grades = data;
      console.log(this.grades);
    });
    
    this.skillsForm = new FormGroup({
      domainSelect: new FormControl('', [Validators.required]),
      gradeSelect: new FormControl('', [Validators.required]),
      subDomainSelect: new FormControl('', [Validators.required])
    });

    // this.mathSkills.getSkills(this.auth.getUserId(),1,1).subscribe((data: any[]) => {
    //   this.skills = data;
    //   console.log(this.skills);
    // }, error => {
    //   this.alert.error("Error occured during retrival of skills.");
    // });
    
  }
  gradeChange(grade: number) {
  this.mathSkills.getSubDomains(this.auth.getUserId(),this.selectedDomain, grade).subscribe((data: MathSubdomain[])  => {
      this.subDomain = data;
    });
  }

  domainChange(domain: number) {
   if (this.selectedGrade > 0) {
    this.mathSkills.getSubDomains(this.auth.getUserId(),this.selectedDomain, this.selectedGrade).subscribe((data: MathSubdomain[])  => {
      this.subDomain = data;
    });
  }
  }

  getSkills() {
    if(this.skillsForm.invalid) {
      this.allValuesSelected = false;
      return;
    }
    this.allValuesSelected = true;
    this.mathSkills.getSkills(this.auth.getUserId(),this.selectedSubDomain,this.selectedGrade).subscribe((data: any[]) => {
      this.skills = data;
      this.ref.detectChanges();
    }, error => {
      this.alert.error("Error occured during retrival of skills.");
    });

  }
  captureText(event: MatSelectChange){
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.selectSubdomainText = selectedData.text;
  }

  addSkill() {
    if(this.skillsForm.invalid) {
      this.allValuesSelected = false;
      return;
    }
    this.editSkill({id: 0, skillName: ''});
  }

  editSkill(skill: any) {
    const ref = this.modal.open(AddEditSkillComponent);
    ref.componentInstance.skill = {id: skill.id, skillName: skill.skillName, subDomainId: this.selectedSubDomain};
    ref.componentInstance.subDomain = this.selectSubdomainText;
    ref.componentInstance.schoolGrades = this.grades;

    ref.result.then((yes) => {
      if (skill.id !== 0) {
        this.skills.find(y=> {
          if (y.id === yes.id) {
            y.skillName = yes.skillName;
            this.ref.detectChanges();
          }
        });
      } else {
        this.getSkills();
      }
    }, (cancel) => {
      console.log('click NO');
    });
  }
}
