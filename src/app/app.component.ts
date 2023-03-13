import { Component } from '@angular/core';
import { GetDataService } from './get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'genesis-couses';

  data: any;
  error: any;

  constructor(private getDataService: GetDataService) {}

  ngOnInit() {
    this.getDataService.getCourses().subscribe(
      (data) => {
        console.log(data);
        this.data = data;
      },
      (error) => (this.error = error)
    );
    this.getDataService
      .getCourse('352be3c6-848b-4c19-9e7d-54fe68fef183')
      .subscribe(
        (data) => {
          console.log(data);
          this.data = data;
        },
        (error) => (this.error = error)
      );

    console.log(this.data);
  }
}
