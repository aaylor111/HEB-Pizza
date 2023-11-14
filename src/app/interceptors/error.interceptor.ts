import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { BadRequestError } from '../errors/bad-request-error';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { ConflictError } from "../errors/conflict-error"
import { NotFoundError } from '../errors/not-found-error';
import { InternalServerError } from '../errors/internal-server-error';

/** This function intercepts all HTTP error responses and thows the appropriate error based upon the HTTP
 *  status code.
 */
export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {


  return next(req).pipe(

    tap(() => {
      
    }),

    catchError((errorResponse: HttpErrorResponse) => {
      
      if (errorResponse.status == HttpStatusCode.BadRequest) {
        throw new BadRequestError("The following response was received with a HTTP status code of 400: " + JSON.stringify(errorResponse));
      }
      else if (errorResponse.status == HttpStatusCode.Unauthorized) {
        throw new UnauthorizedError("The following response was received with a HTTP status code of 401: " + JSON.stringify(errorResponse));
      }
      else if (errorResponse.status == HttpStatusCode.NotFound) {
        throw new NotFoundError("The following response was received with a HTTP status code of 404: " + JSON.stringify(errorResponse));
      }
      else if (errorResponse.status == HttpStatusCode.Conflict) {
        throw new ConflictError("The following response was received with a HTTP status code of 409: " + JSON.stringify(errorResponse));
      }
      else if (errorResponse.status == HttpStatusCode.InternalServerError) {
        throw new InternalServerError("The following response was received with a HTTP status code of 500: " + JSON.stringify(errorResponse));
      }
      else {
        throw new Error("The following unexpected response was received with a HTTP status code of " + JSON.stringify(errorResponse));
      }
    }),

  );

}

