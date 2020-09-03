import { MathDomainResolver } from '../../_resolvers/math-domain-resolvers';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_services/auth-gaurd';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { ManageDomainsComponent } from './math-skills/manage-domains/manage-domains.component';
import { ManageSkillsComponent } from './math-skills/manage-skills/manage-skills.component';
import { ManageSkillsResolver } from 'src/app/_resolvers/manage-skills-resolvers';

const moduleRoutes: Routes = [
    { path: '', 
      component: LayoutComponent,
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
      
        { path: 'dashboard', component: DashboardComponent},  
        { path: 'managedomains', component: ManageDomainsComponent, resolve: {domainData: MathDomainResolver}},  
        { path: 'manageskills', component: ManageSkillsComponent, resolve: {searchLkp: ManageSkillsResolver }},  
      ], 

    },
    { path: '**', redirectTo:'' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(moduleRoutes)],
  exports: [RouterModule],
})
export class DefaultHomeRoutingModule {}
