import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null= null;
  displayedColumns = ['id', 'description', 'courseProgram', 'actions'];

  constructor(
    private service: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private readonly dialog: MatDialog
    ) {
    this.refresh()
  }

  refresh() {
    this.courses$ = this.service.loadCourses()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar cursos');
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
  onSucess(message: string) {
    this.snackBar.open(
      message,
      'x',
      { duration: 5000}
    )
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  onEdit(course: Course) {
    this.router.navigate([course.id], {relativeTo: this.route })
  }
  onDelete(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Deseja remover este curso?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.remove(course)
          .subscribe((data) => {
            this.refresh();
            if (data) {
              this.onSucess('Curso removido com sucesso')
              return
            }
            this.onError('Não foi possível remover curso')
          });
      }
    });
  }
}
