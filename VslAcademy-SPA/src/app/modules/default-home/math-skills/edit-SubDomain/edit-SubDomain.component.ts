import { AlertifyService } from './../../../../common/alertify-service';
import { MathDomain } from './../../../../_models/math-domain';
import { AuthService } from './../../../auth/_services/authService';
import { MathSkillsService } from './../../../../_services/math-skills.service';
import { MathSubdomain, gradeMapping } from './../../../../_models/math-subdomain';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-SubDomain',
  templateUrl: './edit-SubDomain.component.html',
  styleUrls: ['./edit-SubDomain.component.scss']
})
export class EditSubDomainComponent implements OnInit {
  subDomain: MathSubdomain;
  editForm: NgForm;
  domain: string;
  schoolGrades: any[];
  gradeIds: [];
  constructor(public modal: NgbActiveModal, private mathSkillService: MathSkillsService, private auth: AuthService, private alert: AlertifyService) { }

  ngOnInit() {
    this.schoolGrades.forEach(x => {
      x.checked = false;
    });

    this.mathSkillService.getSubDomain(this.auth.getUserId(), this.subDomain.id).subscribe((data: MathSubdomain) => {
      this.subDomain = data;
      this.subDomain.gradeMapping.forEach(y => {
        this.schoolGrades.forEach(x => { if (x['id'] === y.gradeId) {
                                                x.checked = true;
 }  });
      });
    });
  }

  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

  update() {
    this.schoolGrades.forEach( x => {
      const index = this.findWithAttr(this.subDomain.gradeMapping, 'gradeId', x.id);
      if (x.checked) {
        if (index === -1) {
          this.subDomain.gradeMapping.push({Id: 0, subDomainId: this.subDomain.id , gradeId: x.id });
        }
      } else {
          if (index !== -1) {
            this.subDomain.gradeMapping.splice(index, 1);
          }
        }
    });
    this.mathSkillService.updateMathSubDomain(this.auth.getUserId(), this.subDomain.id , this.subDomain).subscribe(x => {
      this.alert.success('Sub domain data successfully update!!');
    }, error => {
      this.alert.success('Error during saving of sub domain data.');
    });
    this.modal.close(this.subDomain);
  }

}
