import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentResolver } from './guards/student.resolver';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StudentsComponent },
  { path: 'new', component: StudentFormComponent, resolve: { student: StudentResolver } },
  { path: ':id', component: StudentFormComponent, resolve: { student: StudentResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
