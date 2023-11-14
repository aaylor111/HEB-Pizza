import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ProgressService } from '../services/progress.service';
import { Observable, catchError, tap } from 'rxjs';
import { inject } from '@angular/core';

/** This function intercepts all HTTP requests and responses in order to turn on/off the 
 *  application's progress indicator.
 */
export function progressInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  // Start the progress indicator.
  let progressService = inject(ProgressService);
  progressService.setActive(true);

  return next(req).pipe(

    // Stop the progress indicator on valid responses.
    tap(() => {
        progressService.setActive(false);
    }),

    // Stop the progress indicator on error responses.
    catchError((errorResponse: HttpErrorResponse) => {
      progressService.setActive(false);
      throw errorResponse;
    }

  ));

}
