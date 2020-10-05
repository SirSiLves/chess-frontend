import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {MatrixService} from "./matrix.service";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameHandlerService {

  public resetClockEvent$: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public gameState$: Subject<any> = new Subject();
  public moveHistory$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isGameEnded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public gameBoard: any;
  public whiteBottom: boolean = true;
  public lastPlayer: any;
  public doBotMoveEvent: EventEmitter<boolean> = new EventEmitter<boolean>();



  public duration: string;


  constructor(private httpService: HttpService,
              private matrixService: MatrixService) {


    this.reloadGamePicture();
  }


  reloadGamePicture(): void {
    this.isRefreshing$.next(true);

    this.httpService.getGamePicture().subscribe(responsePicture => {
      if (this.whiteBottom) {
        this.matrixService.setReverseMatrix(responsePicture.board.fieldMatrix);
      } else {
        this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
      }

      this.moveHistory$.next(responsePicture.board.moveHistory[Object.keys(responsePicture.board.moveHistory).length - 1])

      this.validateGameSate(responsePicture.gameState);

      this.lastPlayer = responsePicture.board.lastPlayed;
      this.gameBoard = responsePicture.board;

      this.doBotMoveEvent.emit(true);
      this.isRefreshing$.next(false);

      this.printSuccessUnitTestsForApi(responsePicture.board.moveHistory);
    });
  }

  validateGameSate(gameState): void {
    const checkMate = gameState.checkMate;
    const remis = gameState.remis;

    if (checkMate || remis) {
      this.gameState$.next(gameState);
      this.isGameEnded$.next(true);
    }
  }


  // preLoadGamePicture(): void {
  //   this.httpService.getPreGamePicture().pipe(take(1)).subscribe(
  //     data => {
  //       this.moveService.lastMoveFields$.next(data.board.moveHistory[Object.keys(data.board.moveHistory).length - 1]);
  //       this.matrixService.setMatrix(data.board.fieldMatrix);
  //     }
  //   );
  // }


  printSuccessUnitTestsForApi(moveHistory) {
    // assertTrue(handleMoveService.handleMove(new String[]{'f', '7'}, new String[]{'f', '5'}).isState());

    const moveHistorySize = Object.keys(moveHistory).length
    let testString = '';

    for (let i = 0; i < moveHistorySize; i++) {
      testString += 'assertTrue(handleMoveService.handleMove(';

      let sourceField = 'new String[]{"' + moveHistory[i].sourceField.fieldDesignation[0] + '", "' + moveHistory[i].sourceField.fieldDesignation[1] + '"}';
      let targetField = 'new String[]{"' + moveHistory[i].targetField.fieldDesignation[0] + '", "' + moveHistory[i].targetField.fieldDesignation[1] + '"}';

      testString += sourceField + ', ' + targetField + ').isState());' + '\n';
    }
    console.log(testString);
  }


}
