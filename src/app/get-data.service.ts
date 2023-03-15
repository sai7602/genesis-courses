import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private baseUrl = 'https://api.wisey.app/api/v1';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}
  getToken(): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}/auth/anonymous?platform=subscriptions`,
        this.httpOptions
      )
      .pipe(map((response) => response.token));
  }
  getCourses(): Observable<any> {
    return this.getToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.get<any>(`${this.baseUrl}/core/preview-courses`, {
          headers,
        });
      })
    );
  }

  getCourse(id: string): Observable<any> {
    return this.getToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        });
        return this.http.get<any>(
          `${this.baseUrl}/core/preview-courses/${id}`,
          {
            headers,
          }
        );
      })
    );
  }
}
