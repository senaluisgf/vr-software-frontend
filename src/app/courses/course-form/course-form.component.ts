import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    id: [0],
    description: [''],
    courseProgram: ['']
  })
  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly service: CoursesService,
    private snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      id: course.id,
      description: course.description,
      courseProgram: course.courseProgram,
    });
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(() => this.onSuccess(), error => this.onError());

  }
  onCancel() {
    this.location.back()
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso', 'x', { duration: 5000 });
    this.onCancel()
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', 'x', { duration: 5000 });
  }
}
