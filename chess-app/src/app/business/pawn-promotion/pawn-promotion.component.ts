import {Component, Input, OnInit} from '@angular/core';
import {GameHandlerService} from "../../services/game-handler.service";
import {HttpService} from "../../services/http.service";


@Component({
  selector: 'app-pawn-changer',
  templateUrl: './pawn-promotion.component.html',
  styleUrls: ['../ending/ending.component.scss', '../pawn-promotion/pawn-promotion.component.scss']
})
export class PawnPromotionComponent implements OnInit {


  @Input() figureColor$: string;

  constructor(private gameHandlerService: GameHandlerService,
              private httpService: HttpService) {
  }

  ngOnInit(): void {
  }


  doPawnChange(selectedPawn): void {
    this.httpService.doPawnChange(selectedPawn).subscribe(responseChange => {
      // console.log(responseChange);
      // this.gameHandlerService.refreshBoardEvent$.emit(true);
    });
  }


}
