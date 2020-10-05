import {Component, Input, OnInit} from '@angular/core';
import {GameHandlerService} from "../../services/game-handler.service";
import {HttpService} from "../../services/http.service";
import {MoveService} from "../../services/move.service";


@Component({
  selector: 'app-pawn-changer',
  templateUrl: './pawn-promotion.component.html',
  styleUrls: ['../ending/ending.component.scss', '../pawn-promotion/pawn-promotion.component.scss']
})
export class PawnPromotionComponent implements OnInit {


  @Input() figureColor$: string;

  constructor(private gameHandlerService: GameHandlerService,
              private httpService: HttpService,
              private moveService: MoveService) {
  }

  ngOnInit(): void {
  }


  doPawnChange(selectedPawn): void {
    this.httpService.doPawnChange(selectedPawn).subscribe(responseChange => {
      this.moveService.pawnChanging$.next(false);

      if (this.moveService.botEnabled == false) {
        this.gameHandlerService.reloadGamePicture();
      }
    });
  }


}
