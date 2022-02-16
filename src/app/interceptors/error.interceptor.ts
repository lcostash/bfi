import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  /**
   * The constructor.
   *
   * @param toastr
   */
  constructor(private toastr: ToastrService) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(event => {
        const title: string = event.status + ' ' + event.statusText;
        const message: string = event.error.message || event.message;

        this.toastr.error(message, title);

        return throwError(message);
      })
    );
  }

}
