import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../../../config/interceptors/http.service';


@Injectable()
export class ProductService extends HttpService<any> {

  constructor(private _http: HttpClient) {
    super(_http, {
      path: '/product',
    });
  }
}

