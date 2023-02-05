import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Enrollment } from '../models/enrollment';
import { EnrollmentsService } from '../services/enrollments.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentResolver implements Resolve<Enrollment> {
  constructor(private readonly service: EnrollmentsService) {};
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Enrollment> {
    return of({ id: 0, studentId: 0, courseId: 0 });
  }
}
