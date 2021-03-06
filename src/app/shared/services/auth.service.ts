import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.API_URL_DEV;
  private helper: JwtHelperService;

  constructor(handler: HttpBackend, private http: HttpClient) {
    this.http = new HttpClient(handler);
    this.helper = new JwtHelperService();
  }

  public login(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/signin`, data).pipe(catchError(this.handleError));
  }

  public signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/signup`, data).pipe(catchError(this.handleError));
  }

  public setToken(data: any) {
    localStorage.setItem('token', JSON.stringify(data));
  }

  public getToken(): any {
    return JSON.parse(localStorage.getItem('token'));
  }

  public hasToken(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  public hasTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.getToken().token);
  }

  private decodeToken(): any {
    return this.helper.decodeToken(this.getToken().token);
  }

  public getLoggedUser(): any {
    if (this.hasToken()) {
      return this.decodeToken();
    }
  }

  public clearStorage(): void {
    localStorage.clear();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error.message);
  };

}
