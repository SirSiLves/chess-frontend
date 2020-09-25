import {Injectable, EventEmitter} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HttpService} from './http.service';
import {ToastrService} from 'ngx-toastr';
import {take} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MoveService {

  public botInfinityEnabled: boolean = true;
  public lastMoveFields$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  public botEnabled: boolean = true;
  public botIsMoving: boolean = false;
  public doBotMoveEvent$:  EventEmitter<boolean> = new EventEmitter<boolean>();
  public moveDoneEvent$:  EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private httpService: HttpService,
              private toast: ToastrService) {

    this.doBotMoveEvent$.subscribe(state => {
      if(state) this.doBotMove();
    });

  }


  doInfinityBotLoop(): void {
    setTimeout(() => {
      if (this.botInfinityEnabled && this.botEnabled) {
        if(!this.botIsMoving) this.doBotMoveEvent$.emit(true);
        this.doInfinityBotLoop();
      }
    }, 250);
  }


  doMove(sourceField, targetField): void {

    const moveObj = {
      sourceField: sourceField.fieldDesignation,
      targetField: targetField.fieldDesignation
    }

    this.httpService.doMove(moveObj).pipe(take(1)).subscribe(validateResponse => {
      if (validateResponse.state) {
        this.moveDoneEvent$.emit(true);

        if(this.botInfinityEnabled && this.botEnabled){
          this.doInfinityBotLoop();
        }
        else if (this.botEnabled) {
          this.doBotMoveEvent$.emit(true);
        }

      } else {
        if(validateResponse.text == 'Check!'){
          this.toast.warning(validateResponse.text)
        }

        // this.printErrorUnitTestsForApi(moveObj);
      }
    });
  }

  doBotMove(): void {
    this.botIsMoving = true;
    this.httpService.doBotMove().subscribe(responseBotMove => {
      this.moveDoneEvent$.emit(true);
      this.botIsMoving = false;
    });
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
