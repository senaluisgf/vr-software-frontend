import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/courses/models/course';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { Student } from 'src/app/students/models/student';
import { StudentsService } from 'src/app/students/services/students.service';
import { Enrollment } from '../models/enrollment';
import { EnrollmentsService } from '../services/enrollments.service';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {
  courses: Course[] = [];
  students: Student[] = [];
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
    private readonly coursesService: CoursesService,
    private readonly studentsService: StudentsService,
    ) {}

  ngOnInit(): void {
    const enrollment: Enrollment = this.route.snapshot.data['enrollment'];
    this.form.setValue({
      id: enrollment.id,
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
    });
    this.coursesService.loadCourses()
      .subscribe(
        (data) => this.courses = data,
        error => this.onError()
      );
    this.studentsService.loadStudents()
      .subscribe(
        (data) => this.students = data,
        error => this.onError()
      );
  }

  onSubmit() {
    const { studentId, courseId} = this.form.value
    this.service.save({
      id: 0,
      studentId: Number(studentId),
      courseId: Number(courseId)
    })
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
