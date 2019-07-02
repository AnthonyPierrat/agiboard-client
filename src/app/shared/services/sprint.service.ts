import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";
import { Sprint } from '../models/sprint';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private API_URL = environment.API_URL_DEV;


  constructor(private http: HttpClient) { }



  public getSprint(id: number): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.API_URL}/sprints/${id}`).pipe(catchError(this.handleError));
  }

  public addSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.API_URL}/sprints`, sprint).pipe(catchError(this.handleError));
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
