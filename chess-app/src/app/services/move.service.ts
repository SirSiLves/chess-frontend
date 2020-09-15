import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpService} from './http.service';
import {ToastrService} from 'ngx-toastr';
import {MatrixService} from './matrix.service';
import {take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MoveService {

  private sourceField$: BehaviorSubject<any>;
  private targetField$: BehaviorSubject<any>;
  public loadingPicture$: BehaviorSubject<boolean>;
  public onClick$: EventEmitter<number> = new EventEmitter<number>();
  public removeMarkup$: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  public clickedCount: number;
  public possibleFields$: Subject<any>;

  public lastBotSourceField: any;
  public lastBotTargetField: any;

  constructor(private httpService: HttpService, private toast: ToastrService, private matrixService: MatrixService) {
    this.sourceField$ = new BehaviorSubject<any>({fieldDesignation: []});
    this.targetField$ = new BehaviorSubject<any>({fieldDesignation: []});
    this.clickedCount = 0;
    this.loadingPicture$ = new BehaviorSubject<any>(false);
    this.possibleFields$ = new Subject<any>();

    this.lastBotSourceField = null;
    this.lastBotTargetField = null;
  }


  getValidField(clickedField) {
    const clickedFieldObj = {
      sourceField: clickedField.fieldDesignation,
    }

    this.httpService.retrieveValidFields(clickedFieldObj).subscribe(responsePossibleFields => {
      this.possibleFields$.next(responsePossibleFields);
    });

  }

  resetLastPlayed() {
    this.lastBotSourceField = null;
    this.lastBotTargetField = null;
  }


  prepareMove(clickedField) {
    this.clickedCount++;
    this.onClick$.emit(this.clickedCount);
    this.removeMarkup$.emit(true);

    if (this.clickedCount == 1 && clickedField.figure != null && this.loadingPicture$.value == false) {

      this.getValidField(clickedField);
      this.sourceField$.next(clickedField);

    } else if (this.clickedCount >= 2) {

      this.targetField$.next(clickedField);
      this.doMove();
    }

  }


  doMove(): void {
    const moveObj = {
      sourceField: this.sourceField$.value.fieldDesignation,
      targetField: this.targetField$.value.fieldDesignation
    }

    this.httpService.doMove(moveObj).subscribe(validateResponse => {
      if (validateResponse.state) {

        this.reloadGamePicture();

        if (this.matrixService.botEnabled) {
          this.loadingPicture$.pipe(take(2)).subscribe(s => {
            if (s == false) {
              this.executeBotMove();
            }
          });
        }

      } else {
        this.toast.warning(validateResponse.text)
        // this.printErrorUnitTestsForApi(moveObj);
      }
    });

    this.clickedCount = 0;
  }

  reloadGamePicture(): void {
    this.loadingPicture$.next(true);

    this.httpService.getGamePicture().subscribe(responsePicture => {
      this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
      this.loadingPicture$.next(false);
      // this.printSuccessUnitTestsForApi(responsePicture.board.moveHistory);
    });
  }

  executeBotMove() {
    this.httpService.doBotMove().subscribe(responseBotMove => {
      // this.toast.info(responseBotMove)

      this.lastBotSourceField = responseBotMove[0].fieldDesignation;
      this.lastBotTargetField = responseBotMove[1].fieldDesignation;

      this.reloadGamePicture();
    });
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

  printErrorUnitTestsForApi(moveObj) {
    // assertFalse(handleMoveService.handleMove(new String[]{'f', '7'}, new String[]{'f', '5'}).isState());

    let testString = 'assertFalse(handleMoveService.handleMove(';
    let sourceField = 'new String[]{"' + moveObj.sourceField[0] + '", "' + moveObj.sourceField[1] + '"}';
    let targetField = 'new String[]{"' + moveObj.targetField[0] + '", "' + moveObj.targetField[1] + '"}';

    testString += sourceField + ', ' + targetField + ').isState());' + '\n';

    console.log(testString);
  }


}
