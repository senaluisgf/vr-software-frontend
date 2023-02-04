import { Component } from '@angular/core';
import { Course } from '../models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses: Course[] = [
    {id: 1, name: "Ciência da Computação", courseProgram: 'Formar Pesquisadores'},
    {id: 2, name: "Engenharia da Computação", courseProgram: 'Formar Engenheiros'},
    {id: 3, name: "Engenharia de Software", courseProgram: 'Formar Programadores'},
  ]
  displayedColumns = ['id', 'name', 'courseProgram']

  constructor(){}

  ngOnInit() : void {}
}
