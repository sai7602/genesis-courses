import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/get-data.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private getDataService: GetDataService
  ) {}
  courseID = this.route.snapshot.params['id'];
  course: any;
  error: any;

  ngOnInit(): void {
    this.getDataService.getCourse(this.courseID).subscribe(
      (data) => {
        this.course = data;
      },
      (error) => (this.error = error)
    );
  }
}
