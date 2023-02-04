import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:3000/courses'

  loadCourses() {
    return this.httpClient.get<Course[]>(this.API)
  }
}
