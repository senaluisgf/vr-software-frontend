import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { EnrollmentResolver } from './guards/enrollment.resolver';

const routes: Routes = [
  { path: '', component: EnrollmentsComponent },
  { path: 'new', component: EnrollmentFormComponent, resolve: { enrollment: EnrollmentResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
