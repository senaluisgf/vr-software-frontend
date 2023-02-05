import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(() => {}, error => this.onError());
  }
  onCancel() {
    this.location.back()
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', 'x', { duration: 5000 });
  }
}
