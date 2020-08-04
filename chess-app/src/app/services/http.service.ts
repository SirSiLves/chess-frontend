import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {IMatrix} from "./matrix.service";
import {ToastrService} from "ngx-toastr";
import {Observable, throwError} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private toast: ToastrService) {
  }

  public getPreGamePicture(): Observable<any> {
    return this.http.get('http://localhost:8080/api/game/getGamePicture', {
      withCredentials: true
    }).pipe(
      catchError(this.handleError('getPreGamePicture'))
    );
  }

  public getGamePicture(): Observable<any> {
    // HttpClient.get() returns the body of the response as an untyped JSON object.
    // We specify the type as SomeClassOrInterfaceto get a typed result.
    // https://stackoverflow.com/questions/35326689/how-to-catch-exception-correctly-from-http-request
    return this.http.get<IMatrix>('http://localhost:8080/api/game/getGamePicture', {
      withCredentials: true
    }).pipe(
      tap(data => {
        console.log('server data gamePicture:', data)
      }),
      catchError(this.handleError('getGamePicture'))
    );
  }

  initializeGame(): Observable<any> {
    return this.http.get('http://localhost:8080/api/initialize/createGame', {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      tap(data => {
        console.log('server data initialize:', data)
      }),
      catchError(this.handleError('initializeGame'))
    );
  }

  validateMove(moveObj): Observable<any> {
    return this.http.post('http://localhost:8080/api/move/doMove', moveObj, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      catchError(this.handleError('validateMove'))
    );
  }


  private handleError(operation: String) {
    return (err: any) => {
      let errMsg = `error in ${operation}() retrieving ${"API URL"}`;
      //console.log(`${errMsg}:`, err)

      if (err instanceof HttpErrorResponse) {
        console.log(`status: ${err.status}, ${err.statusText}`);
        if (err.error.message) {
          this.toast.error(err.error.message);
        } else {
          this.toast.error(errMsg);
        }

      }
      return throwError(err);
    }
  }
}
