import { DifficultyScores } from './../../../../common/difficulty-scores';
import { MathQuestion } from './../../../../_models/math-question';
import { AlertifyService } from './../../../../common/alertify-service';
import { AuthService } from './../../../auth/_services/authService';
import { MathSkillsService } from './../../../../_services/math-skills.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { QuestionType } from 'src/app/common/questionType';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
@Input() displayText: string;
@Input() question : MathQuestion;

  editForm: NgForm;
  
  uploader:FileUploader;
  questionType = QuestionType;
  scores =  DifficultyScores;

  constructor(private mathSkillService: MathSkillsService, 
    private auth: AuthService, private alert: AlertifyService) { }

  ngOnInit() {
    console.log(this.question);
    console.log(this.displayText);
  }

}
