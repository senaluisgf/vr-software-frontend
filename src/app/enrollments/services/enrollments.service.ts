import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:3000/enrollments'

  loadEnrollments() {
    return this.httpClient.get<Enrollment[]>(this.API)
  }

  save(enrollment: Enrollment) {
    return this.create(enrollment);
  }
  private create(enrollment: Enrollment) {
    return this.httpClient.post<Enrollment>(this.API, enrollment);
  }

  remove(enrollment: Enrollment) {
    return this.httpClient.delete<boolean>(this.API, { body: enrollment })
  }
}
