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

  it('should set courses property with the data returned from the service', () => {
    const mockData = { courses: [{ name: 'course1' }, { name: 'course2' }] };
    getDataServiceSpy.getCourses.and.returnValue(of(mockData));
    fixture.detectChanges();
    expect(component.courses).toEqual(mockData.courses);
  });

  it('should set default value for p property to 1', () => {
    expect(component.p).toBe(1);
  });

  it('should set default pagination configuration', () => {
    const expectedConfig: PaginationInstance = {
      id: 'custom',
      itemsPerPage: 10,
      currentPage: 1,
    };
    expect(component.config).toEqual(expectedConfig);
  });

  it('should call the getCourses method of the GetDataService in ngOnInit', () => {
    const mockData = { courses: [{ name: 'course1' }, { name: 'course2' }] };
    getDataServiceSpy.getCourses.and.returnValue(of(mockData));
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
    expect(getDataServiceSpy.getCourses).toHaveBeenCalled();
    expect(component.ngOnInit).toHaveBeenCalled();
  });
});
