import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseComponent } from './components/course/course.component';
import { NgxStarsModule } from 'ngx-stars';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { TimePipe } from './time.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LeftComponent } from './components/pagination/icon/left/left.component';
import { RightComponent } from './components/pagination/icon/right/right.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyHttpInterceptor } from './http-interceptor';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { GetDataService } from './get-data.service';
@NgModule({
  declarations: [
    AppComponent,
    CourseCardComponent,
    CoursesComponent,
    CourseComponent,
    VideoPlayerComponent,
    TimePipe,
    PaginationComponent,
    LeftComponent,
    RightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxStarsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
  ],
  providers: [
    GetDataService,
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
