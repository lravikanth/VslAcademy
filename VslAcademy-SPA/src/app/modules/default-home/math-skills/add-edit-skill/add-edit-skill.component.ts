import { skillGradeMapping } from 'src/app/_models/math-subdomain';
import { AlertifyService } from './../../../../common/alertify-service';
import { AuthService } from './../../../auth/_services/authService';
import { MathSkillsService } from './../../../../_services/math-skills.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-edit-skill',
  templateUrl: './add-edit-skill.component.html',
  styleUrls: ['./add-edit-skill.component.scss']
})
export class AddEditSkillComponent implements OnInit {
  
  editForm: NgForm;
  subDomain: string;
  schoolGrades: any[];
  gradeIds: [];
  skillId: number;
  
  skill: {id: number, skillName: string,subDomainId:number, gradeMapping: skillGradeMapping[] };
  constructor(public modal: NgbActiveModal, private mathSkillService: MathSkillsService, 
              private auth: AuthService, private alert: AlertifyService) { }

  ngOnInit() {
    this.schoolGrades.forEach(x => {
      x.checked = false;
    });
    if (this.skill.id !== 0) {
    this.mathSkillService.getSkill(this.auth.getUserId(), this.skill.id).subscribe((data:any ) => {
      this.skill = data;
      this.skill.gradeMapping?.forEach(y => {
        this.schoolGrades.forEach(x => { if (x.id === y.gradeId) {
                                                x.checked = true;
 }  });
      });
    });
  } 
  }


  findWithAttr(array, attr, value) {
    for (let i = 0; i < array?.length; i += 1) {
      if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

  save() {
    this.schoolGrades.forEach( x => {
      const index = this.findWithAttr(this.skill.gradeMapping, 'gradeId', x.id);
      if (x.checked) {
        if (index === -1) {
          if (typeof this.skill.gradeMapping === 'undefined') {
            this.skill.gradeMapping = [];
          }
          this.skill.gradeMapping.push({Id: 0, skillId: this.skill.id , gradeId: x.id });
        }
      } else {
          if (index !== -1) {
            this.skill.gradeMapping.splice(index, 1);
          }
        }
    });

    this.mathSkillService.updateSkill (this.auth.getUserId(),this.skill).subscribe(x => {
      this.alert.success('Skill data successfully updated!!');
    }, error => {
      this.alert.success('Error during saving of skill data.');
    });
    this.modal.close(this.skill);

  }

}
