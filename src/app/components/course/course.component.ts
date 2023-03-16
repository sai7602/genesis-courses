import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/get-data.service';
import { DatePipe } from '@angular/common';
import { CourseDetail } from 'src/app/course.interface';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [DatePipe],
})
export class CourseComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private getDataService: GetDataService,
    private changeDetector: ChangeDetectorRef
  ) {}
  courseID = this.route.snapshot.params['id'];
  course!: CourseDetail;
  error: any;
  posterSrc!: string;
  videoSrc!: string;
  shouldReloadVideo = false;

  ngOnInit(): void {
    this.getDataService.getCourse(this.courseID).subscribe(
      (data) => {
        this.course = data;
        this.posterSrc = data.previewImageLink + '/cover.webp';
        this.videoSrc = data.lessons[0].link;
        console.log(data);
      },
      (error) => (this.error = error)
    );
  }

  setLessonData(lesson: any) {
    this.videoSrc = lesson.link;
    this.changeDetector.detectChanges();
    console.log(lesson.link);
  }
}
