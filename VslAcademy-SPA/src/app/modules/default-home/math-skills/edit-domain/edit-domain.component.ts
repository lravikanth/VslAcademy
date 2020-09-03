import { MathDomain } from 'src/app/_models/math-domain';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MathSkillsService } from 'src/app/_services/math-skills.service';
import { AuthService } from 'src/app/modules/auth/_services/authService';
import { AlertifyService } from 'src/app/common/alertify-service';
@Component({
  selector: 'app-edit-domain',
  templateUrl: './edit-domain.component.html',
  styleUrls: ['./edit-domain.component.scss']
})
export class EditDomainComponent implements OnInit {
  
  domain: MathDomain;
  editForm:NgForm;
  constructor(public modal: NgbActiveModal, private mathSkillService: MathSkillsService, private auth: AuthService, private alert: AlertifyService) { }

  ngOnInit() {
    console.log(this.domain);

  
  }

  update() {
    this.mathSkillService.updateDomain(this.auth.getUserId(), this.domain.id , this.domain.domain).subscribe(x => {
      this.alert.success('Domain data successfully update!!');
    }, error => {
      this.alert.success('Error during saving of  domain data.');
    });
    console.log(this.domain);

    this.modal.close(this.domain);
  }


}
