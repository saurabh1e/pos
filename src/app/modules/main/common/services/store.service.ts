import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../../../config/interceptors/http.service';
import {IStore} from '../models/store';
import 'rxjs/add/operator/map';


@Injectable()
export class StoreService extends HttpService<any> {

  constructor(private _http: HttpClient) {
    super(_http, {
      path: '/store',
    });
  }

  _store: IStore;

  set store(store: IStore) {
    this._store = store;
  }

  _stores: IStore[] = [];

  set stores(stores: IStore[]) {
    this._stores = stores;
  }

  get store$(): Promise<IStore> {
    return new Promise<IStore>(resolve => resolve(this._store));
  }

  get stores$(): Promise<IStore[]> {
    return new Promise<IStore[]>(resolve => this._stores.length ? resolve(this._stores) :
      this.query().map(res => res.data).subscribe(res => {
        this.stores = res;
        resolve(res);
      }));
  }

}
