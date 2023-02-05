import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private readonly router: Router) {}

  toCourses() {
    this.router.navigate(['courses'])
  }
  toStudents() {
    this.router.navigate(['students'])
  }
  toEnrollments() {
    this.router.navigate(['enrollments'])
  }
}
