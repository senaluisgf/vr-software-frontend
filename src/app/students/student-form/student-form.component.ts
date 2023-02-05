import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    id: [0],
    name: ['']
  })
  constructor(
    private formBuilder: FormBuilder,
    private readonly location: Location,
    private readonly service: StudentsService,
    private snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    const student: Student = this.route.snapshot.data['student'];
    this.form.setValue({
      id: student.id,
      name: student.name,
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
    this.snackBar.open('Aluno salvo com sucesso', 'x', { duration: 5000 });
    this.onCancel()
  }

  private onError() {
    this.snackBar.open('Erro ao salvar aluno', 'x', { duration: 5000 });
  }
}
