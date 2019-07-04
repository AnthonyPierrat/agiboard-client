import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";
import { Workspace } from '../models/workspace';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL_DEV;

  constructor(private http: HttpClient) { }

  public getUserWorkspaces(id: number): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${this.API_URL}/users/${id}/workspaces`).pipe(catchError(this.handleError));
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users`).pipe(catchError(this.handleError));
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
