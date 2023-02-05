import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Course } from 'src/app/courses/models/course';
import { Student } from 'src/app/students/models/student';
import { Enrollment } from '../models/enrollment';
import { EnrollmentsService } from '../services/enrollments.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {
  enrollments$: Observable<Enrollment[]> | null= null;
  students$: Observable<Student[]> | null= null;
  courses$: Observable<Course[]> | null= null;
  displayedColumns = ['id', 'student', 'course', 'actions'];

  constructor(
    private service: EnrollmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ) {
    this.refresh()
  }

  refresh() {
    this.enrollments$ = this.service.loadEnrollments()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar matriculas');
          return of([])
        })
      )
  }

  ngOnInit(): void { }

  onError(message: string) {
    this.snackBar.open(
      message,
      'x',
      { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
    )
  }
  private onSuccess(message: string) {
    this.snackBar.open(message, 'x', { duration: 5000 });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  onEdit(enrollment: Enrollment) {
    this.router.navigate([enrollment.id], {relativeTo: this.route })
  }
  onDelete(enrollment: Enrollment) {
    this.service.remove(enrollment)
      .subscribe((data) => {
        this.refresh();
        if (data) {
          this.onSuccess('Matricula removida com sucesso')
          return
        }
        this.onError('Erro ao remover matrícula')
      }, error => this.onError('Erro ao remover matrícula')
      );
  }
}
