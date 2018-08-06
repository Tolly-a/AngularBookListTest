import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, map} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
const apiUrl = "http://localhost:3000/books";


@Injectable()
export class DataService {

    constructor(private http: HttpClient){}

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
        return throwError('Something bad happened; please try again later.');
      };

      private extractData(res: Response) {
        let body = res;
        return body || { };
      }

      getAllBooks(): Observable<any> {
        return this.http.get(apiUrl, httpOptions).pipe(
          map(this.extractData),
          catchError(this.handleError));
      }

    getBookById(id: string): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.get(url, httpOptions).pipe(
          map(this.extractData),
          catchError(this.handleError));
      }

    postBook(data): Observable<any> {
        return this.http.post(apiUrl, data, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
      
      updateBook(data): Observable<any> {
        const url = `${apiUrl}/${data.id}`;
        return this.http.put(url, data, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
      
      deleteBook(id: string): Observable<{}> {
        const url = `${apiUrl}/${id}`;
        return this.http.delete(url, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
}