import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GameBoard} from "./board/board.component";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGamePicture(){
    //interface mit typisierten objekten -> statt any bspw. board
    return this.http.get<GameBoard>('http://localhost:8080/api/game/getGamePicture', {
      withCredentials: true,
    });
  }

  createGame(){
    return this.http.get('http://localhost:8080/api/initialize/createGame', {
      withCredentials: true,
      responseType: 'text'
    });
  }
}
