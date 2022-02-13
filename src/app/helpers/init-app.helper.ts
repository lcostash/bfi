import {Injectable} from '@angular/core';
import {HttpService} from '../services';

@Injectable()
export class InitAppHelper {

  /**
   * The constructor.
   * @param httpService
   */
  constructor(private httpService: HttpService) {
  }


  load(): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve();
    });
  }

}
