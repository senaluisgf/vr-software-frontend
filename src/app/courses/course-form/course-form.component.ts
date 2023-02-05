import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  form: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      // id: [null],
      description: [null],
      courseProgram: [null]
    })
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('onSubmit')
  }
  onCancel() {
    console.log('onCancel')
  }
}