import { Component, OnInit } from '@angular/core';
import {GameHandlerService} from "../services/game-handler.service";

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {

  public winnerColor: string;
  public winner: boolean = false;
  public remis: boolean = false;
  public showResult: boolean = false;

  constructor(public gameHandlerService: GameHandlerService) { }

  ngOnInit(): void {

    this.gameHandlerService.gameState$.subscribe(gameState => {
      this.showResult = true;

      this.winner = gameState.checkMate;
      this.remis = gameState.remis;

      if(this.winner){
        this.winnerColor = gameState.winner;
      }
    });

  }

  hideWinnerPopup(){
    this.showResult = false;
  }


}
