import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class InterceptorProvider {

  constructor() {
    console.log('Hello InterceptorProvider Provider');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    console.log(token);
    if (token != null) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + token)
      });
      return next.handle(req);
    } else
      return next.handle(req);
  }

}
