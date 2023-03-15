import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/course/course.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { NgxStarsModule } from 'ngx-stars';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
@NgModule({
  declarations: [
    AppComponent,
    CourseCardComponent,
    CoursesComponent,
    CourseComponent,
    StarRatingComponent,
    VideoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxStarsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
