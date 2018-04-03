import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoadingMode, LoadingType, TdLoadingService} from '@covalent/core';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../common/services/user.service';
import {AuthService} from '../common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  username: string;
  password: string;
  userSub: Subscription;

  constructor(private _router: Router,
              private _loadingService: TdLoadingService,
              private _userService: UserService,
              private _authService: AuthService) {
    this._loadingService.create({
      name: 'login',
      type: LoadingType.Circular,
      mode: LoadingMode.Indeterminate,
      color: 'warn',
    });
  }

  ngAfterViewInit() {
    this.checkLogIn();
    this.userSub = this._userService.user$.subscribe(() => {
      this.checkLogIn();
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  login(): void {
    this._loadingService.register('login');
    this._userService.login(this.username, this.password).subscribe((data: any) => {
      this._authService.auth = this._authService.setAuthData(data.id, data.authentication_token);

    }, () => {
      this._loadingService.resolve('login');
    });
  }

  redirect(): void {
    if (this._userService.redirectUrl) {
      this._router.navigate([this._userService.redirectUrl]).then();
    } else {
      this._router.navigate(['']).then();
    }
  }

  checkLogIn(): void {
    if (this._userService.isLoggedIn()) {
      this.redirect();
    }
    this._loadingService.resolve('login');
  }
}
