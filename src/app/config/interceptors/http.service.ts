import {HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';
import {map} from 'rxjs/operators/map';
import {catchError} from 'rxjs/operators/catchError';
import {MOCK_API} from '../api.config';

export type IRestTransform = (response: HttpResponse<any>) => any;

export interface IRestConfig {
  baseHeaders?: HttpHeaders;
  dynamicHeaders?: () => HttpHeaders;
  baseUrl?: string;
  path?: string;
  transform?: IRestTransform;
}

export interface IRestQuery {
  [key: string]: any;
}

export interface IOption {

  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType: 'json';
  withCredentials?: boolean;
}

export interface IHttp {
  delete: (url: string, options: any) => Observable<any>;
  get: (url: string, options: any) => Observable<any>;
  head: (url: string, options: any) => Observable<any>;
  patch: (url: string, options: any, body: any) => Observable<any>;
  post: (url: string, options: any, body: any) => Observable<any>;
  put: (url: string, options: any, body: any) => Observable<any>;
  request: (url: string | HttpRequest<any>) => Observable<any>;
}


export abstract class HttpService<T> {

  protected transform: IRestTransform;
  protected http: HttpClient;
  private _path: string;
  private _base: string = MOCK_API;
  private _baseHeaders: HttpHeaders;
  private _dynamicHeaders: () => HttpHeaders;

  constructor(http: HttpClient, config: IRestConfig) {
    this.http = http;
    this._base = config.baseUrl || this._base;
    this._path = config.path.replace(/^\//, '');
    this._baseHeaders = config.baseHeaders ? config.baseHeaders : new HttpHeaders();
    this._dynamicHeaders = config.dynamicHeaders ? config.dynamicHeaders : () => new HttpHeaders();
    this.transform = config.transform ? config.transform : (response: HttpResponse<T>): any => response;
  }

  public query(query?: IRestQuery, url?: string, transform?: IRestTransform): Observable<T> {
    const request: Observable<any> = this.http.get(this.buildUrl(undefined, url), this.buildRequestOptions(query));
    return request.pipe(
      catchError((error: HttpResponse<T>) => {
        this.catchError(error);

        return new Observable<T>((subscriber: Subscriber<T>) => {
          try {
            subscriber.error(this.transform(error));
          } catch (err) {
            subscriber.error(error);
          }
        });
      }),
      map((res: HttpResponse<T>) => {
        if (transform) {
          return transform(res);
        }
        return this.transform(res);
      }),
    );
  }

  public downloadFile(query?: IRestQuery, url?: string, transform?: IRestTransform): Observable<HttpResponse<Blob>> {
    const request: Observable<any> = this.http.get(this.buildUrl(undefined, url), this.buildRequestOptions(query, 'blob'));
    return request.pipe(
      catchError((error: HttpResponse<T>) => {
        this.catchError(error);
        return new Observable<T>((subscriber: Subscriber<T>) => {
          try {
            subscriber.error(this.transform(error));
          } catch (err) {
            subscriber.error(error);
          }
        });
      }),
      map((res: HttpResponse<Blob>) => {
        if (transform) {
          return transform(res);
        }
        return this.transform(res);
      }),
    );
  }

  public get(id: string | number, query?: IRestQuery, transform?: IRestTransform): Observable<T> {
    const request: Observable<any> = this.http.get(this.buildUrl(id), this.buildRequestOptions(query));
    return request.pipe(
      catchError((error: HttpResponse<T>) => {
        this.catchError(error);
        return new Observable<T>((subscriber: Subscriber<any>) => {
          try {
            subscriber.error(this.transform(error));
          } catch (err) {
            subscriber.error(error);
          }
        });
      }),
      map((res: HttpResponse<T>) => {
        if (transform) {
          return transform(res);
        }
        return this.transform(res);
      }),
    );
  }

  public create(obj: T, query?: IRestQuery, url?: string, transform?: IRestTransform): Observable<T> {
    const request: Observable<any> = this.http.post(this.buildUrl(undefined, url), obj, this.buildRequestOptions(query));
    return request.pipe(
      catchError((error: HttpResponse<T>) => {
        this.catchError(error);
        return new Observable<T>((subscriber: Subscriber<any>) => {
          try {
            subscriber.error(this.transform(error));
          } catch (err) {
            subscriber.error(error);
          }
        });
      }),
      map((res: HttpResponse<T>) => {
        if (res.status === 201) {
          if (transform) {
            return transform(res);
          }
          return this.transform(res);
        } else {
          return res;
        }
      }),
    );
  }

  public update(id: string | number, obj: T, query?: IRestQuery, url?: string, transform?: IRestTransform): Observable<T> {
    const request: Observable<any> = this.http.patch(this.buildUrl(id, url), obj, this.buildRequestOptions(query));
    return request.pipe(
      catchError((error: HttpResponse<T>) => {
        this.catchError(error);
        return new Observable<T>((subscriber: Subscriber<any>) => {
          try {
            subscriber.error(this.transform(error));
          } catch (err) {
            subscriber.error(error);
          }
        });
      }),
      map((res: HttpResponse<T>) => {
        if (res.status === 200) {
          if (transform) {
            return transform(res);
          }
          return this.transform(res);
        } else {
          return res;
        }
      }),
    );
  }

  public delete(id: string | number, query?: IRestQuery, url?: string, transform?: IRestTransform): Observable<T> {
    const request: Observable<any> = this.http.delete(this.buildUrl(id, url), this.buildRequestOptions(query));
    return request.pipe(
      catchError((error: HttpResponse<T>) => {
        this.catchError(error);
        return new Observable<T>((subscriber: Subscriber<any>) => {
          try {
            subscriber.error(this.transform(error));
          } catch (err) {
            subscriber.error(error);
          }
        });
      }),
      map((res: HttpResponse<T>) => {
        console.log(res);
        if (res && res.status === 204) {
          if (transform) {
            return transform(res);
          }
          return this.transform(res);
        } else {
          return res;
        }
      }),
    );
  }

  protected buildRequestOptions(query?: any, responseType?: string): IOption {
    for (const i in query) {
      if (query.hasOwnProperty(i)) {
        if (query[i] === undefined) {
          delete query[i];
        }
      }
    }
    return <IOption>{responseType: responseType ? responseType : 'json', params: query};
  }

  protected buildUrl(id?: string | number, newUrl?: string): string {
    let url: string = newUrl ? newUrl : this._path;
    if (id) {
      url += `/${id}`;
    }
    url = `${this._base}${url}`;
    return url;
  }

  protected buildQuery(query: IRestQuery): string {
    let url = '';
    if (query) {
      url += '?';
      const params: string[] = [];
      for (const key in query) {
        if (query.hasOwnProperty(key)) {
          const value: string | number | boolean = query[key];
          if (value !== undefined) {
            params.push(`${key}=${value}`);
          }
        }
      }
      url += params.join('&');
    }
    return url;
  }

  protected catchError(error: any) {
    if (error.status !== 404 && error.status < 500) {
      console.error(error);
      const err = new Error();
      err.name = error.name;
      err.message = error.error;
    }

  }
}
