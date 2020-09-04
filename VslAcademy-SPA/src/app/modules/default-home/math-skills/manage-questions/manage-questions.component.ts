import { EditQuestionComponent } from './../edit-question/edit-question.component';
import { MathQuestion } from './../../../../_models/math-question';
import { MathSubdomain } from './../../../../_models/math-subdomain';
import { MathDomain } from 'src/app/_models/math-domain';
import { AlertifyService } from './../../../../common/alertify-service';
import { MathSkillsService } from './../../../../_services/math-skills.service';
import { AuthService } from 'src/app/modules/auth/_services/authService';
import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { BreadCrum } from 'src/app/common/bread-crum';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatOption } from '@angular/material/core';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('animationOption2', [
      state('close', style({
        opacity: 0,
      })),
      state('open', style({
        opacity: 1,
      })),
      transition('close <=> open', animate(2000)),
    ])
  ]
})
export class ManageQuestionsComponent implements OnInit {

  skills: any[];
  domains: MathDomain[];
  subDomain: MathSubdomain[];
  grades: any[];
  selectedDomain: number;
  selectedSubDomain: number;
  selectedGrade: number;
  questionsForm: FormGroup;
  allValuesSelected: boolean;
  selectSubdomainText: string;
  selectSubdomainGrade: string;
  selectedSkill: number;
  selectGradeText: string;
  selectSkillText: string;
  questions: MathQuestion[];
  question : MathQuestion;
  displayText: string;
  showEdit: Boolean;
  isSearchOpen: boolean = true;

  constructor(private auth: AuthService, private mathSkills: MathSkillsService, private alert: AlertifyService,
              private route: ActivatedRoute,private ref: ChangeDetectorRef, public modal: NgbModal) { }

  ngOnInit() {

    const arr: BreadCrum[] = [{name: 'Course Mangement', path: '/managequestions'}, {name: 'Manage Questions', path: '/managequestions'}];
    this.auth.changeCurrentPage(arr);
    this.route.data.subscribe(data => {
      this.domains = data.searchLkp;
      console.log(this.domains);
    });

    this.mathSkills.getMathSchoolGrades(this.auth.getUserId()).subscribe((data : any[]) => {
      this.grades = data;
      console.log(this.grades);
    });
    
    this.questionsForm = new FormGroup({
      domainSelect: new FormControl('', [Validators.required]),
      gradeSelect: new FormControl('', [Validators.required]),
      subDomainSelect: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required])
    });
    this.showEdit = false;
  }

  gradeChange(event: MatSelectChange) {

    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.selectGradeText = selectedData.text;
    this.selectedGrade = selectedData.value;
  this.mathSkills.getSubDomains(this.auth.getUserId(),this.selectedDomain, selectedData.value).subscribe((data: MathSubdomain[])  => {
      this.subDomain = data;
    });
  }

  domainChange(domain: number)  {
    if (this.selectedGrade > 0) {
     this.mathSkills.getSubDomains(this.auth.getUserId(),this.selectedDomain, this.selectedGrade).subscribe((data: MathSubdomain[])  => {
       this.subDomain = data;
     });
   }
   }
 

  getQuestions() {
    if(this.questionsForm.invalid) {
      this.allValuesSelected = false;
      return;
    }
    this.allValuesSelected = true;
    this.mathSkills.getQuestions(this.auth.getUserId(),this.selectedSkill,this.selectedGrade).subscribe((data: any[]) => {
     this.questions = data;
      this.ref.detectChanges();
    }, error => {
      this.alert.error("Error occured during retrival of skills.");
    });
  }

  subDomainChange(event: MatSelectChange){
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.selectSubdomainText = selectedData.text;

    this.mathSkills.getSkills(this.auth.getUserId(),this.selectedSubDomain,this.selectedGrade).subscribe((data: any[]) => {
      this.skills = data;
    }, error => {
      this.alert.error("Error occured during retrival of skills.");
    });
  }

  captureText(event: MatSelectChange) {
    const selectedData = {
      text: (event.source.selected as MatOption).viewValue,
      value: event.source.value
    };
    this.selectSkillText = selectedData.text;
  }

  addQuestion() {
    if(this.questionsForm.invalid) {
      this.allValuesSelected = false;
      return;
    }
    let question = new MathQuestion();
    question.id = 0;
    this.editQuestion(question);
  }
  showSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    return false;
  }
  editQuestion(question: MathQuestion) {

    this.question = question;
    this.displayText =  'Question#' +  (question.id === 0) ? 'New' : question.id.toString();
    this.displayText += ' for Skill: ' + this.selectSkillText + '. Grade: ' + this.selectGradeText;
    this.showEdit = true;
   // const ref = this.modal.open(EditQuestionComponent);
    // ref.componentInstance.question = question;
    // ref.componentInstance.displayText = 'Question#' +  (question.id === 0) ? 'New' : question.id + ' for Skill: ' + this.selectSkillText;
    // ref.componentInstance.displayText +=  '. Grade: ' + this.selectGradeText;

    // ref.result.then((yes) => {
    //   console.log(yes);
    //   if (question.id !== 0) {
    //     this.questions.find(y=> {
    //       if (y.id === yes.id) {
    //         y.topText = yes.topText;
    //         this.ref.detectChanges();
    //       }
    //     });
    //   } else {
    //     //this.getSkills();
    //   }
    // }, (cancel) => {
    //   console.log('click NO');
    // });
  }
}
