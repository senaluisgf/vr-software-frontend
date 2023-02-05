import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Student } from '../models/student';
import { StudentsService } from '../services/students.service';

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<Student> {
  constructor(private readonly service: StudentsService) {};
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Student> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ id: 0, name: '' });
  }
}
