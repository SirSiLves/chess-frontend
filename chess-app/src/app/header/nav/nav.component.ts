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

  public alertCheck: boolean = false;
  private gameStateSubscription: Subscription;

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

    this.gameStateSubscription = this.gameHandlerService.gameState$.subscribe(state => {
      if(state.check) {
        this.alertCheck = true;
      }
      else {
        this.alertCheck = false;
      }
      console.log(this.alertCheck);
    });

  }

  handleBot(): void {
    this.moveService.botEnabled = !this.moveService.botEnabled
  }

  createGame(): void {
    if (this.gameHandlerService.isRefreshing$.getValue() == false
      && this.moveService.botIsMoving$.getValue() == false) {

      this.gameHandlerService.isGameEnded$.next(null);
      this.gameHandlerService.resetClockEvent$.emit(true);
      this.gameHandlerService.lastPlayer = null;

      this.httpService.initializeGame().subscribe(responseInitialize => {
        this.toast.success(responseInitialize);
        this.gameHandlerService.reloadGamePicture();
      });
    }
  }

  switchPlayer(): void {
    if (this.gameHandlerService.isRefreshing$.getValue() == false
      && this.moveService.botIsMoving$.getValue() == false) {

      this.gameHandlerService.whiteBottom = !this.gameHandlerService.whiteBottom;
      this.gameHandlerService.reloadGamePicture();
    }
  }


  // createGame(): void {
  //   this.moveService.isGameStopped$.next(true);
  //
  //   this.isMovingSubscription = this.moveService.isMoving$.subscribe(isMoving => {
  //     if(!isMoving){
  //       this.httpService.initializeGame().subscribe(responseInitialize => {
  //         this.gameHandlerService.refreshBoardEvent$.emit(true);
  //         this.gameHandlerService.resetClockEvent$.emit(true);
  //         this.toast.success(responseInitialize);
  //
  //         this.gameHandlerService.isGameEnded = false;
  //         this.isMovingSubscription.unsubscribe();
  //       });
  //     }
  //   });


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
  // }


}
