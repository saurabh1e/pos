import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {MOCK_API} from '../../config/api.config';
import {Auth, AuthService} from './auth.service';
import {HttpService} from '../../config/interceptors/http.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export interface IUser {

  id: string;
  name: string;
  email: string;
  mobile_number: string;
  roles: Role[];
  fcm_token: string;
  retail_shop_ids: string[];
  retail_brand_id: string;
  password?: string;
  brand_id: string;
  permissions: Permission[];
  active: boolean;
  call_center_agent: boolean;

}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
}


@Injectable()
export class UserService extends HttpService<any> {

  public redirectUrl: string = null;

  constructor(private _http: HttpClient, private _authService: AuthService) {
    super(_http, {
      path: 'user',
    });

    this.setUser(this._authService.auth);
    this._authService.auth$.subscribe((auth) => {
      this.setUser(this._authService.auth);
    });
  }

  _user$: Subject<IUser> = <Subject<IUser>> new Subject();

  get user$(): Observable<IUser> {
    return this._user$.asObservable();
  }

  _user: IUser = null;

  get user(): IUser {
    return this._user;
  }

  set user(user: IUser) {
    this._user = user;
    this._user$.next(this.user);
  }

  setUser(auth: Auth) {
    if (auth.id && auth.authentication_token) {
      this.get(auth.id, {__include: ['permissions', 'organisation']}).subscribe((data: IUser) => {
        this.user = data;
      }, (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error.type === 'error' || err.status === 504) {
        }
      });
    }
  }


  login(email, password): Observable<any> {
    return this.create({'email': email, 'password': password}, {}, 'login/');
  }

  logout() {
    return this._authService.deleteAuthData();
  }

  isLoggedIn(): boolean {
    return this.user && this.user.active;
  }

  updateShopAccess(userId: string, shopId: string, action: string): Observable<any> {
    return this._http.post(MOCK_API + 'user_retail_shop', {
      __action: action,
      retail_shop_id: shopId,
      user_id: userId
    });
  }

  hasPermission(perm: string): boolean {
    return this.user.permissions && this.user.permissions.findIndex((permission) => {
      return permission.name === perm;
    }) > -1;
  }
}

@Injectable()
export class RolesService extends HttpService<any> {

  constructor(private _http: HttpClient) {
    super(_http, {
      path: '/role',
    });
  }


  updateRoleAccess(userId: string, roleId: string, action: string): Observable<any> {
    return this._http.post(MOCK_API + 'user_role', {__action: action, user_id: userId, role_id: roleId});
  }


  updatePermissionAccess(data: { user_id: string, permission_id: string, __action: string }[]): Observable<any> {
    return this._http.post(MOCK_API + 'user_permission', data);
  }
}



