import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export type HandleError = <T>(operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(private router: Router) {}

  public handleUnsuccessful(status): Boolean {
    if (!status.success) {
      console.error("An error occurred:", status.message);
      return false;
    }
    return true;
  }

  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${error} in ${serviceName}`);

      const message =
        error.error instanceof ErrorEvent
          ? error.error.message
          : `server returned code ${error.status} with body "${error.error}"`;

      console.info(`${serviceName}, Server Error, ${message}`);

      if (error.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/']);
      } else {
        const errorMessage = error.error.error || error.error.message || 'Server Error';
      }
      return of(result);
    };
  }

  createHandleError = (serviceName) => <T>(
    operation = "operation",
    result = {} as T
  ) => this.handleError(serviceName, operation, result);

}
