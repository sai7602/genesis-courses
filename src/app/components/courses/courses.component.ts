import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/get-data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: any;
  error: any;
  p: number = 1;
  constructor(private getDataService: GetDataService) {}

  ngOnInit() {
    this.getDataService.getCourses().subscribe(
      (data) => {
        console.log(data);
        this.courses = data.courses;
      },
      (error) => (this.error = error)
    );
    this.getDataService
      .getCourse('352be3c6-848b-4c19-9e7d-54fe68fef183')
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => (this.error = error)
      );

    console.log(this.courses);
  }
}
