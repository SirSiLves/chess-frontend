import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {MatrixService} from "./matrix.service";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGamePicture(){
    //interface mit typisierten objekten -> statt any bspw. board
    return this.http
      .get<MatrixService>('http://localhost:8080/api/game/getGamePicture', {
      withCredentials: true,
    });
  }

  createGame(){
    return this.http.get('http://localhost:8080/api/initialize/createGame', {
      withCredentials: true,
      responseType: 'text'
    });
  }

  createGame2(){
    return this.http.get('http://localhost:8080/api/initialize/createGame', {
      withCredentials: true,
      responseType: 'text'
    }).subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );
  }
}
