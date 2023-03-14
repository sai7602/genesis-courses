import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private baseUrl = 'https://api.wisey.app/api/v1';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjIzYTBkOC02YmMwLTQyYTEtODA3Ni0zM2NkMzIwNzk0YjAiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MzQwMTcsImV4cCI6MTY3OTYzNDAxN30.MSSmO1DZYVwuWpc9dK-oZz9fWlp2uiZgWfBkp8HLvYQ',
    }),
  };
  constructor(private http: HttpClient) {}
  getCourses(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/core/preview-courses`,
      this.httpOptions
    );
  }
  getCourse(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/core/preview-courses/${id}`,
      this.httpOptions
    );
  }

  getVideo(videoUrl: string): Observable<any> {
    return this.http.get<any>(`${videoUrl}`, this.httpOptions);
  }
}
