import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseCardComponent } from './components/course-card/course-card.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'course', component: CourseCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
