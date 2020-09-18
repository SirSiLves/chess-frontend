import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {HttpService} from './http.service';
import {ToastrService} from 'ngx-toastr';
import {MatrixService} from './matrix.service';
import {take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MoveService {

  // public lastMoveFields$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public botEnabled: boolean = true;
  public refreshBoard$: EventEmitter<boolean> = new EventEmitter<boolean>();
  public botInfinity: boolean = true;


  constructor(private httpService: HttpService,
              private toast: ToastrService,
              private matrixService: MatrixService) {

    // this.botEnabled$.subscribe(state => {
    //   if(state) this.doBotMove();
    // });
    this.refreshBoard$.subscribe(state => {
      if(state) this.reloadGamePicture();
    })
  }


  doMove(sourceField, targetField): void {

    const moveObj = {
      sourceField: sourceField.fieldDesignation,
      targetField: targetField.fieldDesignation
    }

    this.httpService.doMove(moveObj).pipe(take(1)).subscribe(validateResponse => {
      if (validateResponse.state) {
        this.refreshBoard$.emit(true);

        if(this.botEnabled) this.doBotMove();

      } else {
        this.toast.warning(validateResponse.text)
        // this.printErrorUnitTestsForApi(moveObj);
      }
    });
  }

  doBotMove(): void {
    if(this.botInfinity) {
      this.httpService.doBotMove().pipe(take(1)).subscribe(responseBotMove => {
        this.refreshBoard$.emit(true);

        //call recursive
        if (this.botInfinity && this.botEnabled) {
          setTimeout(() => {
            this.doBotMove();
          }, 100);
        }

      });
    }

  }

  reloadGamePicture(): void {
    this.httpService.getGamePicture().pipe(take(1)).subscribe(responsePicture => {
      // this.lastMoveFields$.next(responsePicture.board.moveHistory[Object.keys(responsePicture.board.moveHistory).length - 1]);
      this.matrixService.setMatrix(responsePicture.board.fieldMatrix);

      // this.printSuccessUnitTestsForApi(responsePicture.board.moveHistory);

      // setTimeout(() => {
      //   this.doBotMove();
      // }, 50);

    });
  }

  preLoadGamePicture(): void {
    this.httpService.getPreGamePicture().pipe(take(1)).subscribe(
      data => {
        // this.lastMoveFields$.next(data.board.moveHistory[Object.keys(data.board.moveHistory).length - 1]);
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

  printErrorUnitTestsForApi(moveObj) {
    // assertFalse(handleMoveService.handleMove(new String[]{'f', '7'}, new String[]{'f', '5'}).isState());

    let testString = 'assertFalse(handleMoveService.handleMove(';
    let sourceField = 'new String[]{"' + moveObj.sourceField[0] + '", "' + moveObj.sourceField[1] + '"}';
    let targetField = 'new String[]{"' + moveObj.targetField[0] + '", "' + moveObj.targetField[1] + '"}';

    testString += sourceField + ', ' + targetField + ').isState());' + '\n';

    console.log(testString);
  }


}
