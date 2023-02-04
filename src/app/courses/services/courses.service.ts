import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private httpClient: HttpClient) { }

  loadCourses(): Course[] {
    return [
      {id: 1, name: "Ciência da Computação", courseProgram: 'Formar Pesquisadores'},
      {id: 2, name: "Engenharia da Computação", courseProgram: 'Formar Engenheiros'},
      {id: 3, name: "Engenharia de Software", courseProgram: 'Formar Programadores'},
    ]
  }
}
