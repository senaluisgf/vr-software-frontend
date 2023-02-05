import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['id', 'description', 'courseProgram', 'actions'];

  constructor(
    private service: CoursesService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.courses$ = this.service.loadCourses()
  }


  ngOnInit(): void { }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  onEdit(course: Course) {
    this.router.navigate([course.id], {relativeTo: this.route })
  }
  onDelete() {
    console.log('onDelete')
  }
}
