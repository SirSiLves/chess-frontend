import { Component, OnInit } from '@angular/core';
import {GameHandlerService} from "../../services/game-handler.service";



@Component({
  selector: 'app-ending',
  templateUrl: './ending.component.html',
  styleUrls: ['./ending.component.scss']
})
export class EndingComponent implements OnInit {

  public winnerColor: string;
  public winner: boolean = false;
  public remis: boolean = false;
  public showResult: boolean = false;
  public remisReason: string;

  constructor(public gameHandlerService: GameHandlerService) { }

  ngOnInit(): void {

    this.gameHandlerService.gameState$.subscribe(gameState => {
      if(gameState.checkMate ||gameState.remis) {
        this.showResult = true;

        this.winner = gameState.checkMate;
        this.remis = gameState.remis;
        this.remisReason = gameState.remisReason;

        if(this.winner) {
          this.winnerColor = gameState.winner;
        }
      }
    });
  }

  hideWinnerPopup(): void {
    this.showResult = false;
  }


}
