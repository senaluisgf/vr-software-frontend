import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { EnrollmentFormComponent } from './enrollment-form/enrollment-form.component';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments/enrollments.component';


@NgModule({
  declarations: [
    EnrollmentsComponent,
    EnrollmentFormComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ReactiveFormsModule,
  ]
})
export class EnrollmentsModule { }
