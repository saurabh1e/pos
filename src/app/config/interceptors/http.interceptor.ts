import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../common/services/auth.service';


@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(public _auth: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._auth.auth) {
      const clonedRequest = req.clone({headers: req.headers.set('Authorization', this._auth.auth.authentication_token)});
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }

  }
}
