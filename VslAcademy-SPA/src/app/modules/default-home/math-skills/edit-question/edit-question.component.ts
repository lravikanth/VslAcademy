import { environment } from './../../../../../environments/environment';
import { DifficultyScores } from './../../../../common/difficulty-scores';
import { MathQuestion } from './../../../../_models/math-question';
import { AlertifyService } from './../../../../common/alertify-service';
import { AuthService } from './../../../auth/_services/authService';
import { MathSkillsService } from './../../../../_services/math-skills.service';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { QuestionType } from 'src/app/common/questionType';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
@Input() displayText: string;
@Input() question : MathQuestion;
@Input() skillId : number;
@Input() gradeId : number;
@ViewChild('editForm') myForm: NgForm;
@Output("editClose") closeEdit: EventEmitter<any> = new EventEmitter();
  
  baseUrl = environment.apiUrl;
  uploader:FileUploader;
  questionTypeObj = QuestionType;
  scores =  DifficultyScores;

  constructor(private mathSkillService: MathSkillsService, 
    private auth: AuthService, private alert: AlertifyService) { }

  ngOnInit() {
    console.log(this.question);
    console.log(this.displayText);
    this.uploader = new FileUploader ({
      url: this.baseUrl  + this.auth.getUserId() + '/questions/addImage/',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      maxFileSize: 5*1020*1024
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;} ;

    this.uploader.onSuccessItem = (item, response,status,headers) => {
      if(response) {
         this.question.url = response;
         this.alert.success("Image succesfully added.");
      }
    };
  }
  
  update() {
   if(this.myForm.valid) {
     this.mathSkillService.addUpdateQuestion(this.auth.getUserId(), this.skillId, this.gradeId, this.question).subscribe((data: MathQuestion) => {
       this.question = data;
       this.alert.success("Question succesfully added/updated.");
       this.closeEdit.emit(this.question);
     }, error => {
      this.alert.error ("Question failed to added/updated.");
     });
   }
  }
}
