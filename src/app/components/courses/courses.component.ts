import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
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
  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
  };
  ngOnInit() {
    this.getDataService.getCourses().subscribe(
      (data) => {
        this.courses = data.courses;
      },
      (error) => (this.error = error)
    );
  }
}
