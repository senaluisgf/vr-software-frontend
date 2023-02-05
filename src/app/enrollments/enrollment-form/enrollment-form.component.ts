import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Enrollment } from '../models/enrollment';
import { EnrollmentsService } from '../services/enrollments.service';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    id: [0],
    studentId: [0],
    courseId: [0]
  })
  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly service: EnrollmentsService,
    private snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    const enrollment: Enrollment = this.route.snapshot.data['enrollment'];
    this.form.setValue({
      id: enrollment.id,
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
    });
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe((data) => {
        if (data) {
          this.onSuccess()
          return
        }
        this.onError()
      }, error => this.onError());

  }
  onCancel() {
    this.location.back()
  }

  private onSuccess() {
    this.snackBar.open('Matrícula realizada com sucesso', 'x', { duration: 5000 });
    this.onCancel()
  }

  private onError() {
    this.snackBar.open('Erro ao realizar matrícula', 'x', { duration: 5000 });
  }
}
