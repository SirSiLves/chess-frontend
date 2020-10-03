import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HttpService} from './http.service';
import {ToastrService} from 'ngx-toastr';
import {take} from "rxjs/operators";
import {GameHandlerService} from "./game-handler.service";


@Injectable({
  providedIn: 'root'
})
export class MoveService {

  public botEnabled: boolean = true;

  public botIsMoving$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  // public botInfinity: boolean = false;
  //
  // public lastMoveFields$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  // public doBotMoveEvent$: EventEmitter<boolean> = new EventEmitter<boolean>();
  // public isMoving$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  // public isGameStopped$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // public pawnChanging$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private httpService: HttpService,
              private toast: ToastrService,
              private gameHandlerService: GameHandlerService) {

    // this.doBotMoveEvent$.subscribe(state => {
    //   if (state) {
    //     this.doBotMove();
    //   }
    // });

  }


  // doInfinityBotLoop(): void {
  //   setTimeout(() => {
  //     if (!this.isGameStopped$.getValue()) {
  //       if (!this.isMoving$.getValue()) {
  //         this.doBotMoveEvent$.emit(true);
  //       }
  //       this.doInfinityBotLoop();
  //     }
  //   }, 250);
  // }


  doMove(sourceField, targetField): void {

    const moveObj = {
      sourceField: sourceField.fieldDesignation,
      targetField: targetField.fieldDesignation
    }

    // this.isMoving$.next(true);

    this.httpService.doMove(moveObj).pipe(take(1)).subscribe(validateResponse => {
      // this.isMoving$.next(false);
      // this.isGameStopped$.next(false);

      if (validateResponse.state) {
        this.gameHandlerService.reloadGamePicture();

        if (this.botEnabled) {
          this.doBotMove();
        }

        // if (this.botEnabled && this.pawnChanging$.getValue() == false) {
        //   this.doBotMoveEvent$.emit(true);
        //
        //   // if (this.botInfinity) {
        //   //   this.doInfinityBotLoop();
        //   // }
        //
        // }

      } else {
        if (validateResponse.text == 'Check!' || validateResponse.text == 'Castling is not allowed') {
          this.toast.warning(validateResponse.text)
        }

        // this.printErrorUnitTestsForApi(moveObj);
      }
    });
  }

  doBotMove(): void {
    setTimeout(() => {
      if(this.gameHandlerService.isRefreshing$.getValue() == false) {
        this.httpService.doBotMove().subscribe(responseBotMove => {
          // this.isMoving$.next(false);
          this.gameHandlerService.reloadGamePicture();
        });
      }
      else {
        this.doBotMove();
      }

    }, 250);


    // this.isMoving$.next(true);


  }


  printErrorUnitTestsForApi(moveObj) {
    // assertFalse(handleMoveService.handleMove(new String[]{'f', '7'}, new String[]{'f', '5'}).isState());

    let testString = 'assertFalse(handleMoveService.handleMove(';
    let sourceField = 'new String[]{"' + moveObj.sourceField[0] + '", "' + moveObj.sourceField[1] + '"}';
    let targetField = 'new String[]{"' + moveObj.targetField[0] + '", "' + moveObj.targetField[1] + '"}';

    testString += sourceField + ', ' + targetField + ').isState());' + '\n';

    console.log(testString);
  }


}
