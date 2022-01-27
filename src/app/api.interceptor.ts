import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    req = req.clone({
      //TODO: to override with the keycloak access token
      setHeaders: {
        'ApiToken': '234567890'
      }
    });
    console.log("intercept", req)

    // Also handle errors globally
    return next.handle(req).pipe();
  }
}