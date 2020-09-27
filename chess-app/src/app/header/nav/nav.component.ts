import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ToastrService} from "ngx-toastr";
import {MoveService} from "../../services/move.service";
import {GameHandlerService} from "../../services/game-handler.service";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private isMovingSubscription: Subscription;


  constructor(private httpService: HttpService,
              private toast: ToastrService,
              public moveService: MoveService,
              private gameHandlerService: GameHandlerService) {
  }


  ngOnInit(): void {
    // this.moveService.isGameStopped$.subscribe(gameClickedEvent => {
    //   console.log("DEBUG");
    //   console.log(gameClickedEvent);
    // });

  }

  handleBot(): void {
    this.moveService.botEnabled = !this.moveService.botEnabled
  }


  createGame(): void {
    this.moveService.isGameStopped$.next(true);

    this.isMovingSubscription = this.moveService.isMoving$.subscribe(isMoving => {
      if(!isMoving){
        this.httpService.initializeGame().subscribe(responseInitialize => {
          this.gameHandlerService.refreshBoardEvent$.emit(true);
          this.gameHandlerService.resetClockEvent$.emit(true);
          this.toast.success(responseInitialize);

          this.gameHandlerService.isGameEnded = false;
          this.isMovingSubscription.unsubscribe();
        });
      }
    });




    // setTimeout(() => {
    //   if (!this.moveService.botIsMoving || this.tryCount >= 1000) {
    //     this.httpService.initializeGame().subscribe(responseInitialize => {
    //       this.gameHandlerService.isGameEnded = false;
    //       this.gameHandlerService.refreshBoardEvent$.emit(true);
    //       this.gameHandlerService.newGameEvent$.emit(true);
    //
    //       this.moveService.botInfinity = true;
    //       this.toast.success(responseInitialize);
    //     });
    //   }
    //   else {
    //     this.createGame();
    //     this.tryCount++;
    //   }
    // }, 750);
  }


  initNewGame() {

  }

}