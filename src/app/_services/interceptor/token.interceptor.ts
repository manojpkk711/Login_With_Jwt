import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { AuthenticationService } from "../auth/authentication.service";
import { map, catchError } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(public _authService: AuthenticationService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this._authService.loadToken();
    let headers = new HttpHeaders();

    if (token) {
      headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    }

    request = request.clone({ headers });
    console.info("request", request.body);

    return next.handle(request).pipe(
      map(res => res),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(new HttpErrorResponse(error));
      })
    );
  }

}
