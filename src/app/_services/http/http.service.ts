import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, params?: any, loader: boolean = true): Observable<any> {
    return this.http.get(this.getFullUrl(url), { params }).pipe( finalize(() => {
      }));
  }

  post(url: string, body: any, params?: any, loader: boolean = true): Observable<any> {
    return this.http.post(this.getFullUrl(url), body, params).pipe( finalize(() => {
    }));
  }

  put(url: string, params: any, loader: boolean = true): Observable<any> {
    return this.http.put(this.getFullUrl(url), params).pipe( finalize(() => {
    }));
  }

  delete(url: string, params?: any, loader: boolean = true): Observable<any> {
    return this.http.delete(this.getFullUrl(url), params).pipe( finalize(() => {
    }));
  }

  private getFullUrl(url: string): string {
    return environment.serverURL + url;
  }
  
}
