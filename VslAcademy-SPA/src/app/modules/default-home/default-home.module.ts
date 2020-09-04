import { ManageSkillsComponent } from './math-skills/manage-skills/manage-skills.component';
import { MathDomainResolver } from '../../_resolvers/math-domain-resolvers';
import { ManageDomainsComponent } from './math-skills/manage-domains/manage-domains.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultHomeRoutingModule } from './defaultHome-routing.module';
import { NgModule } from '@angular/core';
import {  NgbProgressbarModule, NgbDropdownModule, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { AlertifyService } from 'src/app/common/alertify-service';
import { AuthGuard } from '../auth/_services/auth-gaurd';
import { AuthService } from '../auth/_services/authService';
import { ScriptsInitComponent } from './layout/scipts-init/scripts-init.component';
import { AsideComponent } from './layout/aside/aside.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderMenuComponent } from './layout/header/header-menu/header-menu.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule} from '@angular/forms' ;
import { EditDomainComponent } from './math-skills/edit-domain/edit-domain.component';
import { EditSubDomainComponent } from './math-skills/edit-SubDomain/edit-SubDomain.component';
import { ManageSkillsResolver } from 'src/app/_resolvers/manage-skills-resolvers';
import { AddEditSkillComponent } from './math-skills/add-edit-skill/add-edit-skill.component';
import { ManageQuestionsComponent } from './math-skills/manage-questions/manage-questions.component';
import { EditQuestionComponent } from './math-skills/edit-question/edit-question.component';
import { FileUploadModule } from 'ng2-file-upload';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    LayoutComponent,
    ScriptsInitComponent,
    AsideComponent, 
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    ManageDomainsComponent,
    EditDomainComponent, EditSubDomainComponent,
    ManageSkillsComponent,AddEditSkillComponent,
    ManageQuestionsComponent,
    EditQuestionComponent
  ],
  imports: [
    CommonModule,
    DefaultHomeRoutingModule,
    InlineSVGModule,
    NgbProgressbarModule ,
    NgbDropdownModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    FormsModule,
    MatInputModule,
    NgbModalModule,
    ReactiveFormsModule,
    NgbModule,
    MatSelectModule,
    FileUploadModule,
    MatRadioModule
  ],
  providers: [
    AlertifyService, 
    AuthGuard, 
    AuthService,
    MathDomainResolver,
    ManageSkillsResolver
  ]
})
export class DefaultHomeModule { }
