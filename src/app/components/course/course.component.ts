import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDataService } from 'src/app/get-data.service';
import { DatePipe } from '@angular/common';
import { CourseDetail, Lesson } from 'src/app/course.interface';
import { VideoPlayerComponent } from '../video-player/video-player.component';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [DatePipe],
})
export class CourseComponent implements OnInit {
  @ViewChild(VideoPlayerComponent) childComponent!: VideoPlayerComponent;
  constructor(
    private route: ActivatedRoute,
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
      },
      (error) => (this.error = error)
    );
  }

  setLessonData(lesson: Lesson) {
    this.videoSrc = lesson.link;
    this.childComponent.updateVideoSrc(lesson.link);
    this.changeDetector.detectChanges();
  }
}
