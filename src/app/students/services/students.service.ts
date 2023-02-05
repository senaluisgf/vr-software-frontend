import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:3000/students'

  loadStudents() {
    return this.httpClient.get<Student[]>(this.API)
  }

  loadById(id: number) {
    return this.httpClient.get<Student>(`${this.API}/${id}`)
  }

  save(student: Student) {
    if (!student.id) {
      return this.create(student);
    }
    return this.update(student);
  }
  private create(student: Student) {
    return this.httpClient.post<Student>(this.API, student);
  }
  private update(student: Student) {
    return this.httpClient.put<Student>(`${this.API}/${student.id}`, student);
  }

  remove(student: Student) {
    return this.httpClient.delete<boolean>(`${this.API}/${student.id}`)
  }
}
