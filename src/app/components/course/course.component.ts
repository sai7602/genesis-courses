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
  lessonTitle!: string;
  currentLessonId: number = 1;
  sortedLessons!: Lesson[];
  lessonId: string = '';

  ngOnInit(): void {
    this.getDataService.getCourse(this.courseID).subscribe(
      (data) => {
        this.course = data;
        this.sortedLessons = data.lessons.sort(
          (l1: Lesson, l2: Lesson) => l1.order - l2.order
        );
        this.posterSrc = data.previewImageLink + '/cover.webp';
        const getLesson = window.localStorage.getItem(data.id);
        console.log(getLesson);
        if (!getLesson) {
          window.localStorage.setItem(
            `${data.id}`,
            JSON.stringify({ lessonId: data.lessons[0].order })
          );
          this.videoSrc = data.lessons[0].link;
          this.lessonTitle = data.lessons[0].title;
          this.lessonId = data.lessons[0].id;
        } else {
          this.currentLessonId = JSON.parse(getLesson).lessonId;
          this.videoSrc = data.lessons[this.currentLessonId - 1].link;
          this.lessonTitle = data.lessons[this.currentLessonId - 1].title;
          this.lessonId = data.lessons[this.currentLessonId - 1].id;
        }
      },
      (error) => (this.error = error)
    );
  }

  setLessonData(lesson: Lesson) {
    this.videoSrc = lesson.link;
    this.childComponent.updateVideoSrc(lesson.link, lesson.id);
    this.lessonTitle = lesson.title;
    window.localStorage.setItem(
      `${this.course.id}`,
      JSON.stringify({ lessonId: lesson.order })
    );
    this.currentLessonId = lesson.order;

    this.changeDetector.detectChanges();
  }
}
