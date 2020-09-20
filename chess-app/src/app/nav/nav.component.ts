import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {ToastrService} from "ngx-toastr";
import {MoveService} from "../services/move.service";
import {GameHandlerService} from "../services/game-handler.service";



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private tryCount: number = 0;

  constructor(private httpService: HttpService,
              private toast: ToastrService,
              public moveService: MoveService,
              private gameHandlerService: GameHandlerService) {
  }


  ngOnInit(): void {

  }

  handleBot(): void {
    this.moveService.botEnabled = !this.moveService.botEnabled
  }


  createGame(): void {
    this.moveService.botInfinityState = false;

    setTimeout(() => {
      if (!this.moveService.botIsMoving || this.tryCount >= 1000) {
        this.httpService.initializeGame().subscribe(responseInitialize => {
          this.gameHandlerService.isGameEnded = false;
          this.gameHandlerService.refreshBoardEvent$.emit(true);
          this.toast.success(responseInitialize);
        });
      }
      else {
        this.createGame();
        this.tryCount++;
      }
    }, 100);
  }


}
