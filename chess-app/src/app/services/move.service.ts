import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {HttpService} from './http.service';
import {ToastrService} from 'ngx-toastr';
import {MatrixService} from './matrix.service';


@Injectable({
  providedIn: 'root'
})
export class MoveService {


  public lastMoveFields$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public botEnabled: boolean = true;


  constructor(private httpService: HttpService,
              private toast: ToastrService,
              private matrixService: MatrixService) {
  }

  doMove(sourceField, targetField): void {
    const moveObj = {
      sourceField: sourceField.fieldDesignation,
      targetField: targetField.fieldDesignation
    }

    this.httpService.doMove(moveObj).subscribe(validateResponse => {
      if (validateResponse.state) {
        this.reloadGamePicture();
        if (this.botEnabled) this.doBotMove()
      } else {
        this.toast.warning(validateResponse.text)
        // this.printErrorUnitTestsForApi(moveObj);
      }
    });
  }

  doBotMove(): void {
    if (this.botEnabled) {
      this.httpService.doBotMove().subscribe(responseBotMove => {
        this.reloadGamePicture();
      });
    }
  }

  reloadGamePicture(): void {
    this.httpService.getGamePicture().subscribe(responsePicture => {
      this.lastMoveFields$.next(responsePicture.board.moveHistory[Object.keys(responsePicture.board.moveHistory).length - 1]);
      this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
    });
  }

  preLoadGamePicture(): void {
    this.httpService.getPreGamePicture().subscribe(
      data => {
        if (data.message != 'The game is not yet initialized') {
          this.lastMoveFields$.next(data.board.moveHistory[Object.keys(data.board.moveHistory).length - 1]);
          this.matrixService.setMatrix(data.board.fieldMatrix);
        } else {
          //TODO better text output
          this.toast.info(data.message);
        }
      }
    );
  }


  // doMove(): void {
  //   const moveObj = {
  //     sourceField: this.sourceField.fieldDesignation,
  //     targetField: this.targetField.fieldDesignation
  //   }
  //
  //   this.httpService.doMove(moveObj).subscribe(validateResponse => {
  //     if (validateResponse.state) {
  //
  //       this.reloadGamePicture();
  //
  //       // if (this.matrixService.botEnabled) {
  //       //   this.loadingPicture$.pipe(take(2)).subscribe(isLoading => {
  //       //     if (isLoading == false) {
  //       //       this.executeBotMove();
  //       //     }
  //       //   });
  //       // }
  //
  //     } else {
  //       this.toast.warning(validateResponse.text)
  //       // this.printErrorUnitTestsForApi(moveObj);
  //     }
  //   });
  // }

  // reloadGamePicture(): void {
  //   // this.loadingPicture$.next(true);
  //
  //   this.httpService.getGamePicture().subscribe(responsePicture => {
  //     this.matrixService.setMatrix(responsePicture.board.fieldMatrix);
  //     // this.lastMoveFields$.next(responsePicture.board.moveHistory[Object.keys(responsePicture.board.moveHistory).length - 1]);
  //     // this.loadingPicture$.next(false);
  //     // this.printSuccessUnitTestsForApi(responsePicture.board.moveHistory);
  //   });
  // }

  // getValidField(clickedField) {
  //   const clickedFieldObj = {
  //     sourceField: clickedField.fieldDesignation,
  //   }
  //
  //   this.httpService.retrieveValidFields(clickedFieldObj).subscribe(responsePossibleFields => {
  //     this.possibleFields$.next(responsePossibleFields);
  //   });
  //
  // }

  // cleanUpGame(): void {
  //   this.removeMarkup$.emit(true);
  //   // this.lastMoveFields$.next(null);
  // }

  // prepareMove(clickedField): void {
  //   this.clickedCount++;
  //   this.onClick$.emit(this.clickedCount);
  //
  //   if (this.clickedCount == 1 && clickedField.figure != null && this.loadingPicture$.value == false) {
  //
  //     this.getValidField(clickedField);
  //     this.sourceField$.next(clickedField);
  //
  //   } else if (this.clickedCount >= 2) {
  //
  //     this.targetField$.next(clickedField);
  //     this.doMove();
  //   }
  //
  // }


  // printSuccessUnitTestsForApi(moveHistory) {
  //   // assertTrue(handleMoveService.handleMove(new String[]{'f', '7'}, new String[]{'f', '5'}).isState());
  //
  //   const moveHistorySize = Object.keys(moveHistory).length
  //   let testString = '';
  //
  //   for (let i = 0; i < moveHistorySize; i++) {
  //     testString += 'assertTrue(handleMoveService.handleMove(';
  //
  //     let sourceField = 'new String[]{"' + moveHistory[i].sourceField.fieldDesignation[0] + '", "' + moveHistory[i].sourceField.fieldDesignation[1] + '"}';
  //     let targetField = 'new String[]{"' + moveHistory[i].targetField.fieldDesignation[0] + '", "' + moveHistory[i].targetField.fieldDesignation[1] + '"}';
  //
  //     testString += sourceField + ', ' + targetField + ').isState());' + '\n';
  //   }
  //   console.log(testString);
  // }
  //
  // printErrorUnitTestsForApi(moveObj) {
  //   // assertFalse(handleMoveService.handleMove(new String[]{'f', '7'}, new String[]{'f', '5'}).isState());
  //
  //   let testString = 'assertFalse(handleMoveService.handleMove(';
  //   let sourceField = 'new String[]{"' + moveObj.sourceField[0] + '", "' + moveObj.sourceField[1] + '"}';
  //   let targetField = 'new String[]{"' + moveObj.targetField[0] + '", "' + moveObj.targetField[1] + '"}';
  //
  //   testString += sourceField + ', ' + targetField + ').isState());' + '\n';
  //
  //   console.log(testString);
  // }


}
