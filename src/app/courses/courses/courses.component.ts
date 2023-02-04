import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[];
  displayedColumns = ['id', 'name', 'courseProgram'];

  constructor(private service: CoursesService){
    this.courses = this.service.loadCourses();
  }


  ngOnInit() : void {}
}
