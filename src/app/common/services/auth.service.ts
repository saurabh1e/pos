import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {CookieService} from 'ngx-cookie-service';

export interface Auth {
  id: string;
  authentication_token: string;
}

@Injectable()
export class AuthService {
  constructor(private _cookie: CookieService) {

    this.init();
  }

  _auth: Auth = <Auth>{};

  get auth(): Auth {
    return this._auth;
  }

  set auth(data: Auth) {
    this._auth = data;
    this._auth$.next(data);
  }

  _auth$: Subject<Auth> = <Subject<Auth>> new Subject();

  get auth$(): Observable<Auth> {
    return this._auth$.asObservable();
  }

  setAuthData(id: string, token: string): Auth {
    this.deleteAuthData();
    this._cookie.set('id', id, 1);
    this._cookie.set('authentication_token', token, 1);
    return this.getAuthData();
  }

  getAuthData(): Auth {
    return {id: this._cookie.get('id'), authentication_token: this._cookie.get('authentication_token')};
  }

  deleteAuthData(): void {
    return this._cookie.deleteAll();
  }

  init(): void {
    this.auth = this.getAuthData();
  }

}
