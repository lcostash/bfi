import {Injectable} from '@angular/core';
import {HttpService} from '../services';
import {ActionEnum} from '../enums';
import {AuthorsResponseInterface, TypesResponseInterface} from '../interfaces';

@Injectable()
export class InitAppHelper {

  /**
   * The constructor.
   * @param httpService
   */
  constructor(private httpService: HttpService) {
  }


  load(): Promise<void> {
    return new Promise<void>(resolve => {
      // Waiting the execution of both private function
      Promise.all([this.fetchTypes(), this.fetchAuthors()]).finally(() => {
        // Doesn't meter if one of private function didn't get the data from back-end.
        // Anyway we need to pass the promise, cos, we need to finish app's loading process.
        resolve();
      });
    });
  }


  /**
   * Fetch the types from back-end.
   *
   * @private
   * @return Promise<void>
   */
  private fetchTypes(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpService.doAction('types', ActionEnum.view).subscribe({
        next: (response: TypesResponseInterface) => {
          HttpService.types$.next(response);
          resolve();
        },
        error: () => reject()
      });
    });
  }


  /**
   * Fetch the authors from back-end.
   *
   * @private
   * @return Promise<void>
   */
  private fetchAuthors(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpService.doAction('authors', ActionEnum.view).subscribe({
        next: (response: AuthorsResponseInterface) => {
          HttpService.authors$.next(response);
          resolve();
        },
        error: () => reject()
      });
    });
  }

}
