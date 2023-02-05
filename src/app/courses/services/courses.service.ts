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

  loadById(id: number) {
    return this.httpClient.get<Course>(`${this.API}/${id}`)
  }

  save(course: Course) {
    if (!course.id) {
      return this.create(course);
    }
    return this.update(course);
  }
  private create(course: Course) {
    return this.httpClient.post<Course>(this.API, course);
  }
  private update(course: Course) {
    return this.httpClient.put<Course>(`${this.API}/${course.id}`, course);
  }

  remove(course: Course) {
    return this.httpClient.delete<boolean>(`${this.API}/${course.id}`)
  }
}
