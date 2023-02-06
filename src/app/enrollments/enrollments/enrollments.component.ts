import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Course } from 'src/app/courses/models/course';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Student } from 'src/app/students/models/student';
import { StudentsService } from 'src/app/students/services/students.service';
import { Enrollment } from '../models/enrollment';
import { EnrollmentsService } from '../services/enrollments.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent implements OnInit {
  enrollments$: Observable<Enrollment[]> | null= null;
  students: Student[] = [];
  courses: Course[] = [];
  displayedColumns = ['id', 'student', 'course', 'actions'];

  constructor(
    private service: EnrollmentsService,
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
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
      this.coursesService.loadCourses()
      .subscribe(
        (data) => this.courses = data,
        error => this.onError('Não foi possível carregar os cursos')
      );
    this.studentsService.loadStudents()
      .subscribe(
        (data) => this.students = data,
        error => this.onError('Não foi possível carregar os alunos')
      );
  }

  ngOnInit(): void {}

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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Deseja remover esta matrícula?",
    });

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if (result) {
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
    });
  }

  studentName(studentId: number) {
    const student = this.students.find(s => s.id === studentId);
    return student?.name;
  }
  courseName(courseId: number) {
    const course = this.courses.find(c => c.id === courseId);
    return course?.description;
  }
}
