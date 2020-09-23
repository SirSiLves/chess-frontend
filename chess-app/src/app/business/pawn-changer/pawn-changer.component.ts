import {Component, Input, OnInit} from '@angular/core';
import {GameHandlerService} from "../../services/game-handler.service";
import {HttpService} from "../../services/http.service";


@Component({
  selector: 'app-pawn-changer',
  templateUrl: './pawn-changer.component.html',
  styleUrls: ['./pawn-changer.component.scss']
})
export class PawnChangerComponent implements OnInit {


  @Input() figureColor$: string;
  hover: boolean = false;

  constructor(private gameHandlerService: GameHandlerService,
              private httpService: HttpService) {
  }

  ngOnInit(): void {

  }


  doPawnChange(selectedPawn): void {
    this.httpService.doPawnChange(selectedPawn).subscribe(responseChange => {
      console.log("CHANGE DONE!!!");
      console.log(responseChange);

      this.gameHandlerService.refreshBoardEvent$.emit(true);
    });
  }

  toggleColor() {
    if (this.figureColor$ == 'BLACK') {
      this.figureColor$ = 'WHITE'
    } else {
      this.figureColor$ = 'BLACK'
    }
  }
}
