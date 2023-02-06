import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Student } from '../models/student';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students$: Observable<Student[]> | null= null;
  displayedColumns = ['id', 'name', 'actions'];

  constructor(
    private service: StudentsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    ) {
    this.refresh()
  }

  refresh() {
    this.students$ = this.service.loadStudents()
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
  onSuccess(message: string) {
    this.snackBar.open(
      message,
      'x',
      { duration: 5000}
    )
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  onEdit(student: Student) {
    this.router.navigate([student.id], {relativeTo: this.route })
  }
  onDelete(student: Student) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Deseja remover este aluno?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.remove(student)
          .subscribe((data) => {
            this.refresh();
            if (data) {
              this.onSuccess('Aluno removido com sucesso');
              return;
            }
            this.onError('Não foi possível remover o aluno')
          });
      }
    });
  }
}
