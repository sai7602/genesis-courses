import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Додаємо необхідні заголовки до запиту
    const newRequest = request.clone({
      headers: request.headers.set('Access-Control-Allow-Origin', '*')
    });

    return next.handle(newRequest);
  }
}
