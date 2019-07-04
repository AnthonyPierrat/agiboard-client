import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Workspace } from '../models/workspace';
import { catchError } from 'rxjs/internal/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { UserProject } from '../models/userProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private API_URL = environment.API_URL_DEV;

  constructor(private http: HttpClient) { }

  public addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.API_URL}/projects`, project).pipe(catchError(this.handleError));
  }

  public getProject(idProject: number): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/projects/${idProject}`).pipe(catchError(this.handleError));
  }

  public getMembers(idProject: number): Observable<UserProject[]> {
    return this.http.get<UserProject[]>(`${this.API_URL}/projects/${idProject}/members`).pipe(catchError(this.handleError));
  }

  public addMembers(idProject: number, data: any): Observable<UserProject> {
    return this.http.post<UserProject>(`${this.API_URL}/projects/${idProject}/members`, data).pipe(catchError(this.handleError));
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
