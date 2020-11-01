import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {IMatrix} from "./matrix.service";
import {ToastrService} from "ngx-toastr";
import {Observable, throwError} from "rxjs";
import * as Sentry from "@sentry/browser";


Sentry.init({
  dsn: "https://04cbdd38844d4649a320d96582bf0c45@o386758.ingest.sentry.io/5453737"
});

@Injectable({
  providedIn: 'root'
})
export class HttpService implements ErrorHandler {


  constructor(private http: HttpClient,
              private toast: ToastrService) {
  }

  public getPreGamePicture(): Observable<any> {
    return this.http.get('http://localhost:8081/api/game/getGamePicture', {
      withCredentials: true
    }).pipe(
      catchError(this.handleError('getPreGamePicture'))
    );
  }

  public getGamePicture(): Observable<any> {
    return this.http.get<IMatrix>('http://localhost:8081/api/game/getGamePicture', {
      withCredentials: true
    }).pipe(
      tap(data => {
        console.log('server data gamePicture:', data)
      }),
      catchError(this.handleError('getGamePicture'))
    );
  }

  initializeGame(): Observable<any> {
    return this.http.get('http://localhost:8081/api/initialize/createGame', {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      tap(data => {
        console.log('server data initialize:', data)
      }),
      catchError(this.handleError('initializeGame'))
    );
  }

  doMove(moveObj): Observable<any> {
    return this.http.post('http://localhost:8081/api/move/doMove', moveObj, {
      withCredentials: true,
    }).pipe(
      tap(data => {
        console.log('server data move:', data)
      }),
      catchError(this.handleError('validateMove'))
    );
  }

  retrieveValidFields(clickedField): Observable<any> {
    return this.http.post('http://localhost:8081/api/validFields/getFields', clickedField, {
      withCredentials: true
    }).pipe(
      tap(data => {
        if(data == null) {
          this.initializeGame()
        }
        // console.log('server data possible fields:', data)
      }),
      catchError(this.handleError('retrieveValidFields'))
    );
  }

  doBotMove(): Observable<any> {
    return this.http.post('http://localhost:8081/api/move/doBotMove', null, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      tap(data => {
        // console.log('server data bot move:', data)
      }),
      catchError(this.handleError('doBotMove'))
    );
  }

  doPawnChange(selectedFigure): Observable<any> {
    return this.http.post('http://localhost:8081/api/move/doPawnPromotion', selectedFigure, {
      withCredentials: true,
      responseType: 'text'
    }).pipe(
      tap(data => {
        // console.log('server data do pawn change:', data)
      }),
      catchError(this.handleError('doPawnChange'))
    );
  }

  handleError(operation: String) {
    return (err: any) => {
      let errMsg = `error in ${operation}() retrieving ${"API URL"}`;
      //console.log(`${errMsg}:`, err)

      const eventId = Sentry.captureException(err.originalError || err);
      if (err instanceof HttpErrorResponse) {
        console.log(`status: ${err.status}, ${err.statusText}`);
        if (err.error.message) {
          this.toast.error(err.error.message);
        } else {
          this.toast.error(errMsg);
          Sentry.showReportDialog({ eventId });
        }
      }

      return throwError(err);
    }
  }


}
