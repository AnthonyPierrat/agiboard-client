import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Workspace } from '../models/workspace';
import { catchError } from 'rxjs/internal/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private API_URL = environment.API_URL_DEV;

  constructor(private http: HttpClient) { }

  public addEvent(task: Event): Observable<Event> {
    return this.http.post<Event>(`${this.API_URL}/events`, task).pipe(catchError(this.handleError));
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
