import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Todo } from '../models/todo.model';
import { HttpError } from '../models/http-error.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private endpoint = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<Todo[] /* | HttpError */> {
    console.log('Obteniendo TODOS del server');
    return this.http.get<Todo[]>(`${this.endpoint}/todos`)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
  }

  handleHttpError(error: HttpErrorResponse)/* : Observable<HttpError> */ {
    let dataError = new HttpError();
    console.log(error);
    dataError.status = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'Un error ha ocurrido';
    console.log('Error desde handleHttpError');
    return throwError(dataError);
  }
}
