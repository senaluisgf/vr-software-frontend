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
  //Not Found route ()
  { path: ':not-found-route', redirectTo: 'students' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
