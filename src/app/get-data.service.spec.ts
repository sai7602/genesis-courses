import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { GetDataService } from './get-data.service';

describe('GetDataService', () => {
  let service: GetDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetDataService],
    });
    service = TestBed.inject(GetDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token', () => {
    const tokenResponse = { token: 'testToken' };
    service.getToken().subscribe((data) => {
      expect(data).toEqual(tokenResponse.token);
    });

    const req = httpMock.expectOne(
      'https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(tokenResponse);
  });

  it('should get courses', () => {
    const coursesResponse = [{ id: 'course1' }, { id: 'course2' }];
    const token = 'testToken';

    service.getCourses().subscribe((data) => {
      expect(data).toEqual(coursesResponse);
    });

    const tokenReq = httpMock.expectOne(
      'https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions'
    );
    expect(tokenReq.request.method).toEqual('GET');
    tokenReq.flush({ token });

    const coursesReq = httpMock.expectOne(
      'https://api.wisey.app/api/v1/core/preview-courses'
    );
    expect(coursesReq.request.method).toEqual('GET');
    expect(coursesReq.request.headers.get('Authorization')).toEqual(
      `Bearer ${token}`
    );
    coursesReq.flush(coursesResponse);
  });

  it('should get course by id', () => {
    const id = 'course1';
    const courseResponse = { id: 'course1' };
    const token = 'testToken';

    service.getCourse(id).subscribe((data) => {
      expect(data).toEqual(courseResponse);
    });

    const tokenReq = httpMock.expectOne(
      'https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions'
    );
    expect(tokenReq.request.method).toEqual('GET');
    tokenReq.flush({ token });

    const courseReq = httpMock.expectOne(
      `https://api.wisey.app/api/v1/core/preview-courses/${id}`
    );
    expect(courseReq.request.method).toEqual('GET');
    expect(courseReq.request.headers.get('Authorization')).toEqual(
      `Bearer ${token}`
    );
    courseReq.flush(courseResponse);
  });
});
