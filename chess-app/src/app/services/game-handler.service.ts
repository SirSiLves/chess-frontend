import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {MatrixService} from "./matrix.service";
import {MoveService} from "./move.service";
import {take} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameHandlerService {

  public refreshBoardEvent$: EventEmitter<boolean> = new EventEmitter<boolean>();
  public resetClockEvent$: EventEmitter<boolean> = new EventEmitter<boolean>();
  public gameState$: Subject<any> = new Subject();
  public isGameEnded: boolean = false;
  public duration: string;


  constructor(private httpService: HttpService,
              private matrixService: MatrixService,
              private moveService: MoveService) {


    this.moveService.isMoving$.subscribe(movingState => {
      if (!movingState) {
        this.reloadGamePicture();
      }
    });

    this.refreshBoardEvent$.subscribe(state => {
      if (state) {
        this.reloadGamePicture();
      }
    });
  }


  reloadGamePicture(): void {
    this.httpService.getGamePicture().subscribe(responsePicture => {
      this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
      this.moveService.lastMoveFields$.next(responsePicture.board.moveHistory[Object.keys(responsePicture.board.moveHistory).length - 1]);

      this.validateGameSate(responsePicture.gameState);
      // this.printSuccessUnitTestsForApi(responsePicture.board.moveHistory);
    });
  }

  validateGameSate(gameState): void {
    const checkMate = gameState.checkMate;
    const remis = gameState.remis;

    if (checkMate || remis) {
      this.moveService.isGameStopped$.next(true)
      this.isGameEnded = true;
      this.gameState$.next(gameState);
    }
  }


  preLoadGamePicture(): void {
    this.httpService.getPreGamePicture().pipe(take(1)).subscribe(
      data => {
        this.moveService.lastMoveFields$.next(data.board.moveHistory[Object.keys(data.board.moveHistory).length - 1]);
        this.matrixService.setMatrix(data.board.fieldMatrix);
      }
    );
  }


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
