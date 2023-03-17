import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { GetDataService } from 'src/app/get-data.service';
import { of } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let getDataServiceSpy: jasmine.SpyObj<GetDataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GetDataService', ['getCourses']);

    TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      providers: [{ provide: GetDataService, useValue: spy }],
    });

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    getDataServiceSpy = TestBed.inject(
      GetDataService
    ) as jasmine.SpyObj<GetDataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default value for p property to 1', () => {
    expect(component.p).toBe(1);
  });
});
