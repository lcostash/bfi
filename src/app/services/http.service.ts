import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ActionEnum} from '../enums';

@Injectable()
export class HttpService {

  /**
   * The constructor.
   * @param httpClient
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * The main function to fetch data from back-end.
   *
   * @param route The suffix of the end point
   * @param action The action define what type of request will be executed, ex: GET, POST, PUT or DELETE.
   * @param data The data param is optional. Will use it to pass the back-end.
   *
   * @return Observable<any>
   */
  doAction(route: string, action: ActionEnum, data?: any): Observable<any> {
    let url = `${environment.app.ajax.url}/${route}`;
    let http!: Observable<any>;

    if (action === ActionEnum.view) {
      if (typeof data !== 'undefined' && typeof data.id !== 'undefined') {
        url += `/${data.id}`;
      }
      http = this.httpClient.get(url);
    }

    if (action === ActionEnum.add) {
      http = this.httpClient.post(url, data);
    }

    if (action === ActionEnum.edit) {
      http = this.httpClient.put(url, data);
    }

    if (action === ActionEnum.delete) {
      if (typeof data !== 'undefined' && typeof data.id !== 'undefined') {
        url += `/${data.id}`;
      }
      http = this.httpClient.delete(url);
    }

    return http.pipe(tap((result: any) => result, (error: any) => error));
  }

}
