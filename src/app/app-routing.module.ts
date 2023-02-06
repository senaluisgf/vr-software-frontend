import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module')
      .then(m => m.CoursesModule),
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module')
      .then(m => m.StudentsModule),
  },
  {
    path: 'enrollments',
    loadChildren: () => import('./enrollments/enrollments.module')
      .then(m => m.EnrollmentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
