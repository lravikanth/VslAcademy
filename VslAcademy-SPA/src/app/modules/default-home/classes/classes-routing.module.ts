import { SchedulesComponent } from './schedules/schedules.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/_services/auth-gaurd';

const moduleRoutes: Routes = [
    { path: '', component: SchedulesComponent},  
    { path: '**', redirectTo:'' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(moduleRoutes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
